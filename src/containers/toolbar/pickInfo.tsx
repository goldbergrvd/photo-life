import { connect } from "react-redux";
import PickInfo from "../../components/toolbar/pickInfo";
import { StoreState } from "../../types";

function mapStateToProps(state: StoreState) {
  return {
    photoList: state.photoList
  }
}

export default connect(mapStateToProps)(PickInfo)