import { sign } from '@tsndr/cloudflare-worker-jwt';

// IMPORTANT: In a real application, use a secure secret stored as an environment variable.
const JWT_SECRET = 'your-super-secret-key-that-is-at-least-32-characters-long';

async function pbkdf2(password, salt) {
    const enc = new TextEncoder();
    const keyMaterial = await crypto.subtle.importKey(
        'raw',
        enc.encode(password),
        { name: 'PBKDF2' },
        false,
        ['deriveBits', 'deriveKey']
    );
    const key = await crypto.subtle.deriveKey(
        {
            name: 'PBKDF2',
            salt: enc.encode(salt),
            iterations: 100000,
            hash: 'SHA-256'
        },
        keyMaterial,
        { name: 'AES-GCM', length: 256 },
        true,
        ['encrypt', 'decrypt']
    );
    const exportedKey = await crypto.subtle.exportKey('raw', key);
    return btoa(String.fromCharCode.apply(null, new Uint8Array(exportedKey)));
}

export async function onRequestPost({ request, env }) {
    try {
        const { username, password } = await request.json();

        if (!username || !password) {
            return new Response(JSON.stringify({ error: 'Username and password are required' }), { status: 400, headers: { 'Content-Type': 'application/json' } });
        }

        const { results } = await env.DB.prepare('SELECT id, password_hash, role, is_verified FROM Users WHERE username = ?').bind(username).all();

        if (!results || results.length === 0) {
            return new Response(JSON.stringify({ error: 'Invalid credentials' }), { status: 401, headers: { 'Content-Type': 'application/json' } });
        }

        const user = results[0];
        const [salt, storedHash] = user.password_hash.split(':');
        const passwordHash = await pbkdf2(password, salt);

        if (passwordHash !== storedHash) {
            return new Response(JSON.stringify({ error: 'Invalid credentials' }), { status: 401, headers: { 'Content-Type': 'application/json' } });
        }

        if (!user.is_verified) {
            return new Response(JSON.stringify({ needsEmailBinding: true }), { status: 200, headers: { 'Content-Type': 'application/json' } });
        }

        const token = await sign({ id: user.id, role: user.role, is_verified: user.is_verified }, JWT_SECRET, { expiresIn: '24h' });

        return new Response(JSON.stringify({ success: true }), {
            status: 200,
            headers: {
                'Content-Type': 'application/json',
                'Set-Cookie': `auth_token=${token}; HttpOnly; Secure; SameSite=Strict; Path=/; Max-Age=86400`
            }
        });
    } catch (error) {
        console.error(error);
        return new Response(JSON.stringify({ error: 'Internal Server Error' }), { status: 500, headers: { 'Content-Type': 'application/json' } });
    }
}
