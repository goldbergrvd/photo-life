import { connect } from "react-redux";
import { Dispatch } from "redux";
import { AlertAction, setAlert, setState, StateAction } from "../../actions";
import PickInfo from "../../components/toolbar/PickInfo";
import { Alert, State, StoreState } from "../../types";

function mapStateToProps(state: StoreState) {
  return {
    tab: state.tab,
    photoList: state.photoList,
    videoList: state.videoList
  }
}

function mapDispatchToProps(dispatch: Dispatch<AlertAction | StateAction>) {
  return {
    deleteAlert: (alert: Alert) => dispatch(setAlert(alert)),
    pickAlbum: () => dispatch(setState(State.PickAlbum))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PickInfo);
