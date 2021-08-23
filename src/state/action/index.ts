import { ActionType } from "../action-types";
import { Item, Report, Room } from "../entry";

export interface LoadReport {
  type: ActionType.LOAD_REPORT;
  payload: Report;
}

export interface SelectRoom {
  type: ActionType.SELECT_ROOM;
  payload: number;
}

export interface UpdateRoom {
  type: ActionType.UPDATE_ROOM;
  payload: { room: Room; index: number };
}

export interface UpdateItem {
  type: ActionType.UPDATE_ITEM;
  payload: {
    index: number;
    item: Item;
  };
}

export type Action = LoadReport | SelectRoom | UpdateRoom | UpdateItem;
