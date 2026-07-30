import { Request, Response } from "express";
import { IHistoryService } from "../../Interfaces/IHistoryService";

export class HistoryController {

    constructor(private historyService: IHistoryService) {}

    runHistoryService = async (request: Request, response: Response): Promise<any> => {
        try {
            const history = await this.historyService.getHistory();
            return response.status(200).json({ history });
        } catch (error: any) {
            return response.status(500).json({ message: 'Error retrieving history', error: error.message });
        }
    }
}