async function handler(request, env) {
    try {
        const { email, username } = await request.json();

        if (!email || !username) {
            return new Response(JSON.stringify({ error: 'Email and username are required' }), { status: 400, headers: { 'Content-Type': 'application/json' } });
        }

        // Check if the user exists and is not yet verified
        const { results } = await env.DB.prepare('SELECT id FROM Users WHERE username = ? AND is_verified = 0').bind(username).all();
        
        if (!results || results.length === 0) {
            return new Response(JSON.stringify({ error: 'Invalid user or user already verified' }), { status: 404, headers: { 'Content-Type': 'application/json' } });
        }
        
        const userId = results[0].id;

        // Update the user's email and verification status
        await env.DB.prepare('UPDATE Users SET email = ?, is_verified = 1 WHERE id = ?').bind(email, userId).run();

        return new Response(JSON.stringify({ success: true }), { status: 200, headers: { 'Content-Type': 'application/json' } });
    } catch (error) {
        console.error(error);
        return new Response(JSON.stringify({ error: 'Internal Server Error' }), { status: 500, headers: { 'Content-Type': 'application/json' } });
    }
}

// This endpoint is now public but requires a valid username.
export const onRequestPost = [handler];
