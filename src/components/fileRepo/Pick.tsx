import "./setting.css";
import { State, Tab } from "../../types";

export interface Props {
  tab: Tab;
  state: State;
  setState: (state: State) => void;
  clearPhotoSelect: () => void;
  clearVideoSelect: () => void;
}

function text(state: State) {
  switch (state) {
    case State.Browse:
      return '選取'
    case State.Select:
      return '取消'
    default:
      return '選取'
  }
}

function Pick({ tab, state, setState, clearPhotoSelect, clearVideoSelect }: Props) {

  function onClick() {
    switch (state) {
      case State.Browse:
        setState(State.Select)
        return
      case State.Select:
        setState(State.Browse)
        if (tab === Tab.ImageRepo) {
          clearPhotoSelect()
        }
        if (tab === Tab.VideoRepo) {
          clearVideoSelect()
        }
        return
    }
  }

  return (
    <div className="setting pick" onClick={onClick}>{text(state)}</div>
  )
}

export default Pick