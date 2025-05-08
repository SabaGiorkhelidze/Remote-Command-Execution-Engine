import { Request, Response } from 'express';
import { executeRemoteCommand } from './command.service';

export const runCommand = async (request: Request, response: Response) => {
    const { command } = request.body

    if (!command) {
        return response.status(400).json({ error: "Command is Required" })
    }

    try {
        const result = await executeRemoteCommand(command)
        return response.status(200).json({success: true, result: result})
    } catch (error: any) {
        return response.status(500).json({success: false, error: error.message})
    }
}