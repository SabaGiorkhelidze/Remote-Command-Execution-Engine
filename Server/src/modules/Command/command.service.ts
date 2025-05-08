import { Client } from 'ssh2';
import { sshConfig } from '../../config';

export const executeRemoteCommand = (command: string): Promise<string> => {
    return new Promise((resolve, reject) => {
        const connection = new Client();

        connection.on('ready', () => {
            console.log("Client :: ready");
            connection.exec(command, (error, stream) => {
                if (error) {
                    connection.end();
                    return reject(error)
                }

                let stdout = '';
                let stderr = '';

                stream.on('close', (code, signal) => {
                    connection.end()
                    code === 0 ? resolve(stdout.trim()) : reject(new Error(stderr || `Command failed with code ${code}`))

                })
                    .on('data', (data: Buffer) => {
                        stdout += data.toString();
                    })
                    .stderr.on('data', (data: Buffer) => {
                        stderr += data.toString()
                    })
            })
        })
            .on('error', (err) => {
                reject(new Error(`SSH Connection error: ${err.message}`));
            })
            .connect(sshConfig)
    })

};