
import { ExecutionRecord } from "../../types/types";
import { CommandExecutionLog } from "../../Entity/CommandExecutionLog";
import { AppDataSource } from "../../config/data-source";
import { Repository } from "typeorm";

export class HistoryService {
  private repo: Repository<CommandExecutionLog>;

  constructor() {
    this.repo = AppDataSource.getRepository(CommandExecutionLog);
  }


  async saveHistory(record: ExecutionRecord): Promise<CommandExecutionLog> {
    try {
      const newEntry = this.repo.create({
        ...record,
        timestamp: new Date(new Date(record.timestamp).getTime() + 4 * 60 * 60 * 1000), 
      });
      const savedEntry = await this.repo.save(newEntry);
      console.log("History saved:", savedEntry);
      return savedEntry;
    } catch (error) {
      console.error("Error saving history:", error);
      throw new Error("Failed to save history");
    }
  }

  // fetch all records
  async getHistory(): Promise<ExecutionRecord[]> {
    try {
      return this.repo.find({
        order: { timestamp: "DESC" },
      });
    } catch (error) {
      console.error("Error fetching history:", error);
      throw new Error("Failed to fetch history");
    }
  }
}
