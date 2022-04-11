import { connect } from "react-redux";
import Toolbar from "../../components/toolbar/toolbar";
import { StoreState } from "../../types";

function mapStateToProps(state: StoreState) {
  return {
    state: state.state
  }
}

export default connect(mapStateToProps)(Toolbar)