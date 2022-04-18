import { SET_ALERT } from "../constants"
import { Alert } from "../types";

export interface SetAlert {
  type: SET_ALERT;
  payload: {
    alert: Alert
  }
}

export type AlertAction = SetAlert

export function setAlert(alert: Alert): AlertAction {
  return {
    type: SET_ALERT,
    payload: { alert }
  }
}
