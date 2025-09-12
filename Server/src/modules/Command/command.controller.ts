import { Request, Response } from 'express';
import { CommandService } from './command.service';

export class CommandController {
  private commandService: CommandService;

  constructor() {
    this.commandService = new CommandService();
  }

  runCommand = async(req: Request, res: Response): Promise<void> => {
    const { command } = req.body;

    if (!command) {
      res.status(400).json({ error: 'Command is required' });
      return;
    }

    try {
      const result = await this.commandService.executeRemoteCommand(command);
      res.status(200).json({ success: true, result });
    } catch (error: any) {
      res.status(500).json({ success: false, error: `this is ${error.message}` });
    }
  }
}
