import { ViewTypeAction } from "../actions";
import { SET_VIEW_TYPE } from "../constants";
import { ViewType } from "../types";

export default function viewTypeReducer (viewType: ViewType = ViewType.Day, action: ViewTypeAction): ViewType {
  switch(action.type) {
    case SET_VIEW_TYPE:
      return action.payload.viewType
    default:
      return viewType
  }
}
