import { ActionType } from "../action-types";
import { Report } from "../entry";

export interface LoadReport {
  type: ActionType.LOAD_REPORT;
  payload: Report;
}

export type Action = LoadReport;
