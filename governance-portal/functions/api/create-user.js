import { adminAuthMiddleware } from './authMiddleware';

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
        const { username, password, role } = await request.json();

        if (!username || !password || !role) {
            return new Response(JSON.stringify({ error: 'Username, password, and role are required' }), { status: 400, headers: { 'Content-Type': 'application/json' } });
        }

        // Check if user already exists
        const { results } = await env.DB.prepare('SELECT id FROM Users WHERE username = ?').bind(username).all();
        if (results && results.length > 0) {
            return new Response(JSON.stringify({ error: 'Username already exists' }), { status: 409, headers: { 'Content-Type': 'application/json' } });
        }

        const passwordHash = await hashPassword(password);

        // Insert new user into the database
        await env.DB.prepare(
            'INSERT INTO Users (username, password_hash, role, is_verified) VALUES (?, ?, ?, ?)'
        ).bind(username, passwordHash, role, 0).run(); // is_verified is set to 0 (false) by default

        return new Response(JSON.stringify({ success: true, username, role }), { status: 201, headers: { 'Content-Type': 'application/json' } });

    } catch (error) {
        console.error('Error creating user:', error);
        return new Response(JSON.stringify({ error: 'Internal Server Error' }), { status: 500, headers: { 'Content-Type': 'application/json' } });
    }
}

// Protect this endpoint with the admin-only middleware
export const onRequestPost = [adminAuthMiddleware, handler];
