import { authMiddleware } from './authMiddleware';

async function handler(request, env) {
    try {
        const { email } = await request.json();
        const userId = request.user.id;

        if (!email) {
            return new Response(JSON.stringify({ error: 'Email is required' }), { status: 400, headers: { 'Content-Type': 'application/json' } });
        }

        await env.DB.prepare('UPDATE Users SET email = ?, is_verified = 1 WHERE id = ?').bind(email, userId).run();

        return new Response(JSON.stringify({ success: true }), { status: 200, headers: { 'Content-Type': 'application/json' } });
    } catch (error) {
        console.error(error);
        return new Response(JSON.stringify({ error: 'Internal Server Error' }), { status: 500, headers: { 'Content-Type': 'application/json' } });
    }
}

export const onRequestPost = [authMiddleware, handler];
