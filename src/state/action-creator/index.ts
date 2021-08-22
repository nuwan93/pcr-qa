import { LoadReport, SelectRoom } from "../action";
import { ActionType } from "../action-types";
import { Entry } from "../entry";

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
