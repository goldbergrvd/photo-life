import "./setting.css";
import { State } from "../../types";

export interface Props {
  state: State,
  setState: (state: State) => void,
  clearPhotoSelect: () => void
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

function Pick({ state, setState, clearPhotoSelect }: Props) {

  function onClick() {
    switch (state) {
      case State.Browse:
        setState(State.Select)
        return
      case State.Select:
        setState(State.Browse)
        clearPhotoSelect()
        return
    }
  }

  return (
    <div className="setting pick" onClick={onClick}>{text(state)}</div>
  )
}

export default Pick