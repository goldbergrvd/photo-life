import PickInfo from "../../containers/toolbar/PickInfo"
import { State } from "../../types"
import Progress from "./Progress"
import Tabs from "../../containers/toolbar/Tabs"
import "./toolbar.css"

export interface Props {
  state: State
}

function switchToolbar(state: State) {
  switch(state) {
    case State.Browse:
      return <Tabs />
    case State.Select:
      return <PickInfo />
    case State.Upload:
      return <Progress />
  }
}

function Toolbar({ state }: Props) {
  return (
    <div className="toolbar">
      {switchToolbar(state)}
    </div>
  )
}

export default Toolbar;