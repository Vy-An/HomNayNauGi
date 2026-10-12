const crypto = require('crypto');

const HASH_PREFIX = 'scrypt';
const KEY_LENGTH = 64;

function hashPassword(password) {
    const salt = crypto.randomBytes(16).toString('hex');
    const hash = crypto.scryptSync(String(password), salt, KEY_LENGTH).toString('hex');

    return `${HASH_PREFIX}$${salt}$${hash}`;
}

function isHashedPassword(value) {
    return typeof value === 'string' && value.startsWith(`${HASH_PREFIX}$`);
}

function timingSafeEqualHex(a, b) {
    const bufferA = Buffer.from(a, 'hex');
    const bufferB = Buffer.from(b, 'hex');

    if (bufferA.length !== bufferB.length) return false;

    return crypto.timingSafeEqual(bufferA, bufferB);
}

function verifyPassword(password, storedPassword) {
    if (!storedPassword) return false;

    if (!isHashedPassword(storedPassword)) {
        return String(password) === String(storedPassword);
    }

    const parts = storedPassword.split('$');
    if (parts.length !== 3) return false;

    const [, salt, storedHash] = parts;
    const inputHash = crypto.scryptSync(String(password), salt, KEY_LENGTH).toString('hex');

    return timingSafeEqualHex(inputHash, storedHash);
}

module.exports = {
    hashPassword,
    isHashedPassword,
    verifyPassword
};
