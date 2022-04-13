import { TabAction } from "../actions";
import { SET_TAB } from "../constants";
import { Tab } from "../types";

export default function (tab: Tab = Tab.ImageRepo, action: TabAction): Tab {
  switch(action.type) {
    case SET_TAB:
      return action.payload.tab
    default:
      return tab
  }
}
