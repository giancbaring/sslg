import { authMiddleware } from './authMiddleware';

async function handler(request, env) {
    try {
        // These are just example queries. You should adjust them to your actual database schema.
        const { results: projects } = await env.DB.prepare("SELECT COUNT(*) as count FROM Projects WHERE status = 'active'").all();
        const { results: approvals } = await env.DB.prepare("SELECT COUNT(*) as count FROM Resolutions WHERE status = 'pending'").all();
        const { results: funds } = await env.DB.prepare("SELECT SUM(amount) as total FROM Treasury").all();
        const { results: events } = await env.DB.prepare("SELECT name, date FROM Events WHERE date > date('now') ORDER BY date ASC LIMIT 1").all();

        const stats = {
            activeProjects: projects[0]?.count || 0,
            pendingApprovals: approvals[0]?.count || 0,
            totalFunds: funds[0]?.total || 0,
            nextEvent: events[0] ? `${events[0].name} on ${events[0].date}` : 'No upcoming events',
        };

        return new Response(JSON.stringify(stats), { status: 200, headers: { 'Content-Type': 'application/json' } });
    } catch (error) {
        console.error(error);
        return new Response(JSON.stringify({ error: 'Internal Server Error' }), { status: 500, headers: { 'Content-Type': 'application/json' } });
    }
}

export const onRequestGet = [authMiddleware, handler];
