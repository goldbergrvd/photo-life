import { connect } from "react-redux";
import { Dispatch } from "redux";
import { AlertAction, setAlert } from "../../actions";
import PickInfo from "../../components/toolbar/PickInfo";
import { Alert, StoreState } from "../../types";

function mapStateToProps(state: StoreState) {
  return {
    tab: state.tab,
    photoList: state.photoList,
    videoList: state.videoList
  }
}

function mapDispatchToProps(dispatch: Dispatch<AlertAction>) {
  return {
    deleteAlert: (alert: Alert) => dispatch(setAlert(alert))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PickInfo);
