import { ExecutionRecord } from "../../types/types";

const historyLog: ExecutionRecord[] = [];

export const saveToHistory = (record: ExecutionRecord) => {
  historyLog.push(record);

};

export const getHistory = (): ExecutionRecord[] => {
  return historyLog;
};