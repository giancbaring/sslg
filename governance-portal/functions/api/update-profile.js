import { authMiddleware } from './authMiddleware';

// Securely hash a password with a random salt
async function hashPassword(password) {
    const salt = crypto.randomUUID().replace(/-/g, '');
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
    // Convert the ArrayBuffer to a Base64 string for storage
    const hash = btoa(String.fromCharCode.apply(null, new Uint8Array(exportedKey)));
    return `${salt}:${hash}`;
}

async function handler(request, env) {
    try {
        const { newUsername, newPassword } = await request.json();
        const userId = request.user.id;

        if (!newUsername && !newPassword) {
            return new Response(JSON.stringify({ error: 'No new username or password provided' }), { status: 400, headers: { 'Content-Type': 'application/json' } });
        }

        if (newUsername) {
            // Check if the new username is already taken
            const { results } = await env.DB.prepare('SELECT id FROM Users WHERE username = ? AND id != ?').bind(newUsername, userId).all();
            if (results && results.length > 0) {
                return new Response(JSON.stringify({ error: 'Username already exists' }), { status: 409, headers: { 'Content-Type': 'application/json' } });
            }
            await env.DB.prepare('UPDATE Users SET username = ? WHERE id = ?').bind(newUsername, userId).run();
        }

        if (newPassword) {
            const passwordHash = await hashPassword(newPassword);
            await env.DB.prepare('UPDATE Users SET password_hash = ? WHERE id = ?').bind(passwordHash, userId).run();
        }

        return new Response(JSON.stringify({ success: true }), { status: 200, headers: { 'Content-Type': 'application/json' } });
    } catch (error) {
        console.error(error);
        return new Response(JSON.stringify({ error: 'Internal Server Error' }), { status: 500, headers: { 'Content-Type': 'application/json' } });
    }
}

export const onRequestPost = [authMiddleware, handler];
