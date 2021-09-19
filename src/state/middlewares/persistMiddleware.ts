import { Dispatch } from "redux";

import { Action } from "../action";
import { RootState } from "../reducers";

export const persistMiddleware = ({
  dispatch,
  getState,
}: {
  dispatch: Dispatch<Action>;
  getState: () => RootState;
}) => {
  let timer: NodeJS.Timeout;
  return (next: (action: Action) => void) => {
    return (action: Action) => {
      next(action);
      if (timer) {
        clearTimeout(timer);
      }
      timer = setTimeout(() => {
        const serializedData = JSON.stringify(getState().report);
        localStorage.setItem("reportData", serializedData);
      }, 400);
    };
  };
};
