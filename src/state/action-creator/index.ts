import { v4 as uuid_v4 } from "uuid";

import {
  AddItem,
  AddRoom,
  DeleteItem,
  DeleteRoom,
  LoadReport,
  SelectRoom,
  UpdateDate,
  UpdateItem,
  UpdateItemListOrder,
  UpdateRoom,
  UpdateRoomListOrder,
} from "../action";
import { ActionType } from "../action-types";
import { conditionType, Entry, Room, Item, Report } from "../entry";

export const loadReport = (report: Entry, fileName: string): LoadReport => {
  report.rooms?.forEach((room) => {
    room.id = uuid_v4();
    room.items?.forEach((item) => {
      item.id = uuid_v4();
    });
  });

  return {
    type: ActionType.LOAD_REPORT,
    payload: {
      fileName,
      selectedRoom: 0,
      entry: report,
    },
  };
};

export const loadReportFromLocalStorage = (report: Report): LoadReport => {
  return {
    type: ActionType.LOAD_REPORT,
    payload: report,
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
  id: string,
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
        id,
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
      id: uuid_v4(),
      title: "",
      comment: "",
      type: "FIXTURE",
      condition: {
        isClean: undefined,
        isUndamaged: undefined,
        isWorking: undefined,
      },
    },
  };
};

export const addRoom = (): AddRoom => {
  return {
    type: ActionType.ADD_ROOM,
    payload: {
      id: uuid_v4(),
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

export const updateItemListOrder = (items: Item[]): UpdateItemListOrder => {
  return {
    type: ActionType.UPDATE_ITEM_LIST_ORDER,
    payload: items,
  };
};

export const updateRoomListOrder = (rooms: Room[]): UpdateRoomListOrder => {
  return {
    type: ActionType.UPDATE_ROOM_LIST_ORDER,
    payload: rooms,
  };
};

export const updateDate = (date: number): UpdateDate => {
  return {
    type: ActionType.UPDATE_DATE,
    payload: date,
  };
};
