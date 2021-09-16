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

export interface AddItem {
  type: ActionType.ADD_ITEM;
  payload: Item;
}

export interface AddRoom {
  type: ActionType.ADD_ROOM;
  payload: Room;
}

export interface DeleteItem {
  type: ActionType.DELETE_ITEM;
  payload: number;
}

export interface DeleteRoom {
  type: ActionType.DELETE_ROOM;
}

export interface UpdateItemListOrder {
  type: ActionType.UPDATE_ITEM_LIST_ORDER;
  payload: Item[];
}

export type Action =
  | LoadReport
  | SelectRoom
  | UpdateRoom
  | UpdateItem
  | AddItem
  | AddRoom
  | DeleteItem
  | DeleteRoom
  | UpdateItemListOrder;
