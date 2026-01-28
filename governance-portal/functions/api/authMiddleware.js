import { verify } from '@tsndr/cloudflare-worker-jwt';

function getCookie(request, name) {
    let result = null;
    const cookieString = request.headers.get('Cookie');
    if (cookieString) {
        const cookies = cookieString.split(';');
        cookies.forEach(cookie => {
            const cookiePair = cookie.split('=', 2);
            const cookieName = cookiePair[0].trim();
            if (cookieName === name) {
                const cookieVal = cookiePair[1];
                result = cookieVal;
            }
        });
    }
    return result;
}

// Base authentication function to verify JWT
async function baseAuth(request, env) {
    const token = getCookie(request, 'auth_token');
    if (!token) {
        return { error: new Response('Unauthorized: No token provided', { status: 401 }) };
    }
    try {
        const { payload } = await verify(token, env.JWT_SECRET);
        if (!payload) {
            return { error: new Response('Invalid token payload', { status: 401 }) };
        }
        request.user = payload; // Attach user payload to the request for downstream use
        return { payload };
    } catch (err) {
        return { error: new Response('Invalid or expired token', { status: 401 }) };
    }
}

// Standard middleware to check if a user is logged in
export async function authMiddleware(request, env, next) {
    const { error } = await baseAuth(request, env);
    if (error) return error;
    return await next(request, env);
}

// Admin-only middleware to check for 'admin' role
export async function adminAuthMiddleware(request, env, next) {
    const { payload, error } = await baseAuth(request, env);
    if (error) return error;

    if (payload.role !== 'admin') {
        return new Response('Forbidden: Administrator access required', { status: 403 });
    }

    return await next(request, env);
}
