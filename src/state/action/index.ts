import { ActionType } from "../action-types";
import { Report } from "../entry";

export interface LoadReport {
  type: ActionType.LOAD_REPORT;
  payload: Report;
}

export interface SelectRoom {
  type: ActionType.SELECT_ROOM;
  payload: number;
}

export type Action = LoadReport | SelectRoom;
