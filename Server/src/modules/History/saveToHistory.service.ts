import { ExecutionRecord } from "../../types/types";
import fs from "fs"
import { CommandExecutionLog } from "../../Entity/CommandExecutionLog";
import { AppDataSource } from "../../config/data-source";


const historyLog: ExecutionRecord[] = [];



export const saveToHistory = async  (record: ExecutionRecord) => {
  historyLog.push(record);
  console.log('TIMESTAMP :: ',record.timestamp);

  const repo = AppDataSource.getRepository(CommandExecutionLog)

  const newEntry = repo.create({
    ...record,
    timestamp: new Date(
    new Date(record.timestamp).getTime() + 4 * 60 * 60 * 1000 // Add 4 hours
  ),
  })

  await repo.save(newEntry)
  
  console.log(historyLog);

};

export const getHistory = async (): Promise<ExecutionRecord[]> => {
  const repo = AppDataSource.getRepository(CommandExecutionLog)
  return repo.find({
    order: {
      timestamp: "DESC",
    },
  })
  // return historyLog;
};