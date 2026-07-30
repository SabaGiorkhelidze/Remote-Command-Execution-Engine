export interface ICommandService {
  executeRemoteCommand(command: string): Promise<string>;
}
