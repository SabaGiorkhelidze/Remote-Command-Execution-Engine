import { Client } from 'ssh2';
import { sshConfig } from '../../config/SSHConfig';
import { saveToHistory } from '../History/saveToHistory.service';

export const executeRemoteCommand = (command: string): Promise<string> => {
    return new Promise((resolve, reject) => {
        const connection = new Client();

        connection.on('ready', () => {
            console.log("Client :: ready");
            connection.exec(command, (error, stream) => {
                if (error) {
                    connection.end();
                    saveToHistory({
                        user: sshConfig.username,
                        host: sshConfig.host,
                        command,
                        output: error.message,
                        timestamp: new Date(),
                        success: false, 
                    });
                    return reject(error);
                }

                let stdout = '';
                let stderr = '';

                stream.on('close', (code: any, signal: any) => {
                    connection.end();

                    saveToHistory({
                        user: sshConfig.username,
                        host: sshConfig.host,
                        command,
                        output: code === 0 ? stdout.trim() : stderr.trim(),
                        timestamp: new Date(),
                        success: code === 0, // Set success based on the exit code
                    });

                    code === 0
                        ? resolve(stdout.trim())
                        : reject(new Error(stderr || `Command failed with code ${code}`));
                })
                .on('data', (data: Buffer) => {
                    stdout += data.toString();
                })
                .stderr.on('data', (data: Buffer) => {
                    stderr += data.toString();
                });
            });
        })
        .on('error', (err) => {
            saveToHistory({
                user: sshConfig.username,
                host: sshConfig.host,
                command,
                output: `SSH Connection error: ${err.message}`,
                timestamp: new Date(),
                success: false, 
            });
            console.error("SSH connection error details:", err);
            reject(new Error(`SSH Connection error: ${err.message}`));
        })
        .connect(sshConfig);
    });
};
