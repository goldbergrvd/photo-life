import { AlertAction } from "../actions";
import { SET_ALERT } from "../constants";
import { Alert } from "../types";

export default function (alert: Alert = Alert.None, action: AlertAction): Alert {
  switch(action.type) {
    case SET_ALERT:
      return action.payload.alert
    default:
      return alert
  }
}