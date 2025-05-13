import { ExecutionRecord } from "../../types/types";
import fs from "fs"

const historyLog: ExecutionRecord[] = [];



export const saveToHistory = (record: ExecutionRecord) => {
  historyLog.push(record);
  
  console.log(historyLog);

};

export const getHistory = (): ExecutionRecord[] => {
  return historyLog;
};