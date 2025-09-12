import { Client } from 'ssh2';
import { sshConfig } from '../../config/SSHConfig';
import { HistoryService } from '../History/history.service'; 

export class CommandService {
  private historyService: HistoryService;

  constructor() {
    this.historyService = new HistoryService();
  }


  async executeRemoteCommand(command: string): Promise<string> {
    return new Promise((resolve, reject) => {
      const connection = new Client();

      connection.on('ready', () => {
        console.log('Client :: ready');
        connection.exec(command, async (error, stream) => {
          if (error) {
            connection.end();
            await this.historyService.saveHistory({
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

          stream.on('close', async (code: any, signal: any) => {
            connection.end();
            const success = code === 0;
            await this.historyService.saveHistory({
              user: sshConfig.username,
              host: sshConfig.host,
              command,
              output: success ? stdout.trim() : stderr.trim(),
              timestamp: new Date(),
              success,
            });

            success ? resolve(stdout.trim()) : reject(new Error(stderr || `Command failed with code ${code}`));
          }).on('data', (data: Buffer) => {
            stdout += data.toString();
          }).stderr.on('data', (data: Buffer) => {
            stderr += data.toString();
          });
        });
      }).on('error', async (err) => {
        await this.historyService.saveHistory({
          user: sshConfig.username,
          host: sshConfig.host,
          command,
          output: `SSH Connection error: ${err.message}`,
          timestamp: new Date(),
          success: false,
        });
        reject(new Error(`SSH Connection error: ${err.message}`));
      }).connect(sshConfig);
    });
  }
}
