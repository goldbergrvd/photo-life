import { connect } from "react-redux";
import { Alert, StoreState } from "../types";

import ViewSwitch from "../components/view/ViewSwitch";

function mapStateToProps(state: StoreState) {
  return {
    tab: state.tab
  }
}

export default connect(mapStateToProps)(ViewSwitch);
