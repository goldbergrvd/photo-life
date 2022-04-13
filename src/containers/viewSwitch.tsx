import { connect } from "react-redux";
import { StoreState } from "../types";

import ViewSwitch from "../components/view/viewSwitch";

function mapStateToProps(state: StoreState) {
  return {
    tab: state.tab
  }
}

export default connect(mapStateToProps)(ViewSwitch);
