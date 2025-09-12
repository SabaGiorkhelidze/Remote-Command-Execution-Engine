import { Request, Response } from 'express';
import { CommandService } from './command.service';

export class CommandController {
  private commandService: CommandService;

  constructor() {
    this.commandService = new CommandService();
  }

  async runCommand(req: Request, res: Response): Promise<any> {
    const { command } = req.body;

    if (!command) {
      res.status(400).json({ error: 'Command is required' });
      return;
    }

    try {
      const result = await this.commandService.executeRemoteCommand(command);
      return res.status(200).json({ success: true, result });
    } catch (error: any) {
      return res.status(500).json({ success: false, error: error.message });
    }
  }
}
