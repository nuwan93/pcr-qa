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
        if (!state.entry.rooms) {
          return state;
        }
        state.entry.rooms[index].title = title;
        if (action.payload.room.altTitle === undefined) {
          return state;
        }
        state.entry.rooms[index].altTitle = altTitle;
        return state;

      case ActionType.UPDATE_ITEM:
        const { item } = action.payload;
        if (!state.entry.rooms) {
          return state;
        }
        if (!state.entry.rooms[state.selectedRoom].items) {
          return state;
        }

        return state;

      default:
        return state;
    }
  }
);

export default reportReducer;
