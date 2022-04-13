import { SET_TAB } from "../constants"
import { Tab } from "../types";

export interface SetTab {
  type: SET_TAB;
  payload: {
    tab: Tab
  }
}

export type TabAction = SetTab

export function setTab(tab: Tab): TabAction {
  return {
    type: SET_TAB,
    payload: { tab }
  }
}
