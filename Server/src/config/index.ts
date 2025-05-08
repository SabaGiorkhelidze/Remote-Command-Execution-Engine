import * as fs from 'fs';
import * as path from 'path';
import * as dotenv from 'dotenv';

dotenv.config();

export const sshConfig = {
    host: process.env.SSH_HOST!,
    port: Number(process.env.SSH_PORT) || 22,
    username: process.env.SSH_USER!,
    privateKey: fs.readFileSync(path.resolve(process.env.SSH_PRIVATE_KEY!)),
};