import { SET_VIEW_TYPE } from "../constants"
import { ViewType } from "../types";

export interface SetViewType {
  type: SET_VIEW_TYPE;
  payload: {
    viewType: ViewType
  }
}

export type ViewTypeAction = SetViewType

export function setViewType(viewType: ViewType): ViewTypeAction {
  return {
    type: SET_VIEW_TYPE,
    payload: { viewType }
  }
}
