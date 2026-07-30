import { ExecutionRecord } from "../types/types";
import { CommandExecutionLog } from "../Entity/CommandExecutionLog";

export interface IHistoryService {
  saveHistory(record: ExecutionRecord): Promise<CommandExecutionLog>;
  getHistory(): Promise<ExecutionRecord[]>;
}
