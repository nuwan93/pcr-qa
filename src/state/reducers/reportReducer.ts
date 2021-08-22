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

      default:
        return state;
    }
  }
);

export default reportReducer;
