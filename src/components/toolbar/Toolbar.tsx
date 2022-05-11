import PickInfo from "../../containers/toolbar/PickInfo"
import { State } from "../../types"
import UploadProgress from "../../containers/toolbar/UploadProgress"
import Tabs from "../../containers/toolbar/Tabs"
import "./toolbar.css"

export interface Props {
  state: State
}

function switchToolbar(state: State) {
  switch(state) {
    case State.Browse:
    case State.AddAlbum:
    case State.DeleteAlbum:
      return <Tabs />
    case State.Select:
      return <PickInfo />
    case State.Upload:
      return <UploadProgress />
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