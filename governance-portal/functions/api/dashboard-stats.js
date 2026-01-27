
import { verify, decode } from '@tsndr/cloudflare-worker-jwt';

export async function onRequestGet(context) {
  const { request, env } = context;
  const cookie = request.headers.get('cookie');
  
  if (!cookie || !cookie.includes('auth_token')) {
    return new Response(JSON.stringify({ error: 'Authentication token not found.' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const token = cookie.match(/auth_token=([^;]+)/)[1];

  try {
    // Verify the JWT token
    const isValid = await verify(token, env.JWT_SECRET);
    if (!isValid) {
      return new Response(JSON.stringify({ error: 'Invalid token.' }), {
        status: 403,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const { payload } = decode(token);
    const userId = payload.sub;

    // Fetch user data from D1
    const userQuery = 'SELECT role, first_name FROM users WHERE id = ?';
    const userResult = await env.DB.prepare(userQuery).bind(userId).first();

    if (!userResult) {
      return new Response(JSON.stringify({ error: 'User not found.' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Fetch stats from D1
    const projectsQuery = 'SELECT COUNT(*) as count FROM projects WHERE status = ?';
    const pendingApprovalsQuery = 'SELECT COUNT(*) as count FROM resolutions WHERE status = ?';
    const fundsQuery = 'SELECT SUM(amount) as total FROM treasury_ledger';
    const nextEventQuery = 'SELECT title, date FROM events ORDER BY date ASC LIMIT 1';

    const activeProjects = await env.DB.prepare(projectsQuery).bind('Active').first();
    const pendingApprovals = await env.DB.prepare(pendingApprovalsQuery).bind('Pending').first();
    const totalFunds = await env.DB.prepare(fundsQuery).first();
    const nextEvent = await env.DB.prepare(nextEventQuery).first();

    const stats = {
      activeProjects: activeProjects?.count || 0,
      pendingApprovals: pendingApprovals?.count || 0,
      totalFunds: totalFunds?.total || 0,
      nextEvent: nextEvent ? `${nextEvent.title} on ${new Date(nextEvent.date).toLocaleDateString()}` : 'N/A',
    };

    return new Response(JSON.stringify({ 
      user: { role: userResult.role, firstName: userResult.first_name },
      stats 
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });

  } catch (err) {
    console.error('Dashboard stats error:', err);
    return new Response(JSON.stringify({ error: 'An internal server error occurred.' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
