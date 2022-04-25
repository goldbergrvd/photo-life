import { COLOR_BLACK, SET_FILE_COUNT_COLOR } from "../constants"

export interface SetFileCountColor {
  type: SET_FILE_COUNT_COLOR;
  payload: string
}

export type FileCountColorAction = SetFileCountColor

export function setFileCountColor(color: string = COLOR_BLACK): FileCountColorAction {
  return {
    type: SET_FILE_COUNT_COLOR,
    payload: color
  }
}
