const crypto = require('crypto');
require('dotenv').config();
const PASSPHRASE = process.env.ENCRYPTION_PASSPHRASE;
if (!PASSPHRASE) throw new Error('ENCRYPTION_PASSPHRASE must be set in .env');

const SALT = 'github-oauth-salt-v1'; // can be env in prod
const KEY_LEN = 32;

function getKey() {
  return crypto.scryptSync(PASSPHRASE, SALT, KEY_LEN);
}

function encrypt(plaintext) {
  const iv = crypto.randomBytes(12);
  const key = getKey();
  const cipher = crypto.createCipheriv('aes-256-gcm', key, iv);
  const ciphertext = Buffer.concat([cipher.update(Buffer.from(plaintext, 'utf8')), cipher.final()]);
  const tag = cipher.getAuthTag();
  return `${iv.toString('hex')}:${tag.toString('hex')}:${ciphertext.toString('hex')}`;
}

function decrypt(payload) {
  const parts = payload.split(':');
  if (parts.length !== 3) throw new Error('Invalid encrypted payload');
  const iv = Buffer.from(parts[0], 'hex');
  const tag = Buffer.from(parts[1], 'hex');
  const ciphertext = Buffer.from(parts[2], 'hex');
  const key = getKey();
  const decipher = crypto.createDecipheriv('aes-256-gcm', key, iv);
  decipher.setAuthTag(tag);
  const decrypted = Buffer.concat([decipher.update(ciphertext), decipher.final()]);
  return decrypted.toString('utf8');
}

module.exports = { encrypt, decrypt };
