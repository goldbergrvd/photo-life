import { connect } from "react-redux";
import { Alert, StoreState } from "../types";

import ViewSwitch from "../components/view/ViewSwitch";

function mapStateToProps(state: StoreState) {
  const unscroll = state.photoList.some(photo => photo.browsed) || state.alert !== Alert.None

  return {
    tab: state.tab,
    unscroll
  }
}

export default connect(mapStateToProps)(ViewSwitch);
