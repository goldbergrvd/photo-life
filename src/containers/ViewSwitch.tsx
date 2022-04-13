import { connect } from "react-redux";
import { StoreState } from "../types";

import ViewSwitch from "../components/view/ViewSwitch";

function mapStateToProps(state: StoreState) {
  const browsed = state.photoList.filter(photo => photo.browsed)[0] !== undefined
  return {
    tab: state.tab,
    browsed
  }
}

export default connect(mapStateToProps)(ViewSwitch);
