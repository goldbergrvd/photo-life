import { SET_STATE } from "../constants"
import { State } from "../types";

export interface SetState {
  type: SET_STATE;
  payload: {
    state: State
  }
}

export type StateAction = SetState

export function setState(state: State): StateAction {
  return {
    type: SET_STATE,
    payload: { state }
  }
}
