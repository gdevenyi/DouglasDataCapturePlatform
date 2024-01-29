#!/usr/bin/env node

import crypto from 'crypto';
import fs from 'fs/promises';
import path from 'path';
import url from 'url';

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const projectRoot = path.resolve(__dirname, '..');

/** @returns {Promise<string>} */
const generateSecureToken = async () => {
  return new Promise((resolve, reject) => {
    crypto.generateKey('hmac', { length: 256 }, (err, key) => {
      if (err) {
        return reject(err);
      }
      resolve(key.export().toString('hex'));
    });
  });
};

const secretKey = await generateSecureToken();

const gatewayDataDir = path.resolve(projectRoot, 'apps/gateway/data');
fs.mkdir(gatewayDataDir, { recursive: true });
const gatewayDbUrl = `file:${path.resolve(gatewayDataDir, 'gateway.db')}`;

let env = await fs.readFile(path.resolve(projectRoot, '.env.template'), 'utf-8');
env = env.replace('PROJECT_ROOT=', `PROJECT_ROOT=${projectRoot}`);
env = env.replace('SECRET_KEY=', `SECRET_KEY=${secretKey}`);
env = env.replace('GATEWAY_DATABASE_URL=', `GATEWAY_DATABASE_URL=${gatewayDbUrl}`);
env = env.replace('GATEWAY_AUTH_TOKEN=', 'GATEWAY_AUTH_TOKEN=' + (await generateSecureToken()));

const filepath = path.resolve(projectRoot, '.env');
await fs.writeFile(filepath, env, 'utf-8').then(() => {
  console.log(`Done! Successfully generated file: ${filepath}`);
});
