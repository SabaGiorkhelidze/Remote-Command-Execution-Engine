export interface SSHInput {
  host: string;
  port: number;
  username: string;
  password?: string;
  privateKey?: string;
  command: string;
}

export type ExecutionRecord = {
  user?: string;
  host: string;
  command: string;
  output: string;
  timestamp: Date;
  success: boolean;
};