import { TypedUseSelectorHook, useSelector } from "react-redux";
import { RootState } from "../state";

export const usedTypedSelector: TypedUseSelectorHook<RootState> = useSelector;
