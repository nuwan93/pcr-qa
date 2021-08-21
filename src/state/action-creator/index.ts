import { LoadReport } from "../action";
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
