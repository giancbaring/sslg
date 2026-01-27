import * as crypto from 'crypto';

// This script uses Node.js crypto, which is compatible with the Web Crypto API used in Cloudflare Workers.
async function hashPassword(password) {
    if (!password) {
        console.error('Usage: node governance-portal/scripts/hash-password.js <password>');
        process.exit(1);
    }

    try {
        const salt = crypto.randomUUID().replace(/-/g, '');
        const key = await new Promise((resolve, reject) => {
            crypto.pbkdf2(password, salt, 100000, 32, 'sha256', (err, derivedKey) => {
                if (err) reject(err);
                resolve(derivedKey);
            });
        });

        // The format is salt:hash
        const hash = key.toString('base64');
        console.log(`${salt}:${hash}`);

    } catch (error) {
        console.error('Error hashing password:', error);
        process.exit(1);
    }
}

const password = process.argv[2];
hashPassword(password);
