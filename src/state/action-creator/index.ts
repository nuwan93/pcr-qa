import {
  AddItem,
  AddRoom,
  DeleteItem,
  DeleteRoom,
  LoadReport,
  SelectRoom,
  UpdateItem,
  UpdateRoom,
} from "../action";
import { ActionType } from "../action-types";
import { conditionType, Entry, Room } from "../entry";

export const loadReport = (report: Entry, fileName: string): LoadReport => {
  return {
    type: ActionType.LOAD_REPORT,
    payload: {
      fileName,
      selectedRoom: 0,
      entry: report,
    },
  };
};

export const selectRoom = (index: number): SelectRoom => {
  return {
    type: ActionType.SELECT_ROOM,
    payload: index,
  };
};

export const updateRoom = (room: Room, index: number): UpdateRoom => {
  return {
    type: ActionType.UPDATE_ROOM,
    payload: { room, index },
  };
};

export const updateItem = (
  index: number,
  title: string,
  comment: string,
  type: string,
  isClean: conditionType,
  isUndamaged: conditionType,
  isWorking: conditionType
): UpdateItem => {
  return {
    type: ActionType.UPDATE_ITEM,
    payload: {
      index,
      item: {
        title,
        comment,
        type,
        condition: {
          isClean,
          isUndamaged,
          isWorking,
        },
      },
    },
  };
};

export const addItem = (): AddItem => {
  return {
    type: ActionType.ADD_ITEM,
    payload: {
      title: "",
      comment: "",
      type: "FIXTURE",
      condition: {
        isClean: "NA",
        isUndamaged: "NA",
        isWorking: "NA",
      },
    },
  };
};

export const addRoom = (): AddRoom => {
  return {
    type: ActionType.ADD_ROOM,
    payload: {
      title: "",
      items: [],
    },
  };
};

export const deleteRoom = (): DeleteRoom => {
  return {
    type: ActionType.DELETE_ROOM,
  };
};

export const deleteItem = (index: number): DeleteItem => {
  return {
    type: ActionType.DELETE_ITEM,
    payload: index,
  };
};
