import { StateAction } from "../actions";
import { SET_STATE } from "../constants";
import { State } from "../types";

export default function (state: State = State.Browse, action: StateAction): State {
  switch(action.type) {
    case SET_STATE:
      return action.payload.state
    default:
      return state
  }
}