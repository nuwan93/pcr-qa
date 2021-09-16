import produce from "immer";
import { Report } from "../entry";
import { Action } from "../action";
import { ActionType } from "../action-types";

const initialState: Report = {
  fileName: null,
  selectedRoom: 0,
  entry: {
    importMode: "",
    type: "",
    inspectedAt: 0,
  },
};

const reportReducer = produce(
  (state: Report = initialState, action: Action): Report => {
    switch (action.type) {
      case ActionType.LOAD_REPORT:
        state = action.payload;
        return state;

      case ActionType.SELECT_ROOM:
        state.selectedRoom = action.payload;
        return state;

      case ActionType.UPDATE_ROOM:
        const { index, room } = action.payload;
        const { title, altTitle } = room;
        if (!state.entry.rooms) return state;
        state.entry.rooms[index].title = title;
        if (action.payload.room.altTitle === undefined) return state;
        state.entry.rooms[index].altTitle = altTitle;
        return state;

      case ActionType.UPDATE_ITEM:
        const { item } = action.payload;
        if (!state.entry.rooms) return state;
        const items = state.entry.rooms[state.selectedRoom].items;
        if (!items) return state;
        if (!items[action.payload.index]) return state;
        items[action.payload.index] = item;
        return state;

      case ActionType.ADD_ITEM:
        if (!state.entry.rooms) return state;
        const roomToAddItem = state.entry.rooms[state.selectedRoom];
        if (!roomToAddItem) return state;
        roomToAddItem.items?.push(action.payload);
        return state;

      case ActionType.ADD_ROOM:
        state.entry.rooms?.push(action.payload);
        return state;

      case ActionType.DELETE_ROOM:
        if (!state.entry.rooms) return state;
        state.entry.rooms.splice(state.selectedRoom, 1);
        if (state.selectedRoom === 0) {
          state.selectedRoom = 0;
        } else {
          state.selectedRoom--;
        }

        return state;

      case ActionType.DELETE_ITEM:
        if (!state.entry.rooms) return state;
        const itemList = state.entry.rooms[state.selectedRoom].items;
        if (!itemList) return state;
        itemList.splice(action.payload, 1);
        return state;
      default:
        return state;

      case ActionType.UPDATE_ITEM_LIST_ORDER:
        if (!state.entry.rooms) return state;
        state.entry.rooms[state.selectedRoom].items = action.payload;
        return state;
    }
  }
);

export default reportReducer;
