import { connect } from "react-redux";
import Toolbar from "../../components/toolbar/Toolbar";
import { State, StoreState } from "../../types";
import PickInfo from "./PickInfo";
import Tabs from "./Tabs";
import UploadProgress from "./UploadProgress";

function mapStateToProps(state: StoreState) {
  switch(state.state) {
    case State.Select:
      return { component: <PickInfo /> }
    case State.Upload:
      return { component: <UploadProgress /> }
    case State.Browse:
    case State.AddAlbum:
    case State.DeleteAlbum:
    default:
      return { component: <Tabs /> }
  }
}

export default connect(mapStateToProps)(Toolbar);
