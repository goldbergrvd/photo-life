import { connect } from "react-redux";
import { Dispatch } from "redux";
import { AlertAction, setAlert } from "../../actions";
import PickInfo from "../../components/toolbar/PickInfo";
import { Alert, StoreState } from "../../types";

function mapStateToProps(state: StoreState) {
  return {
    photoList: state.photoList
  }
}

function mapDispatchToProps(dispatch: Dispatch<AlertAction>) {
  return {
    deleteAlert: () => dispatch(setAlert(Alert.DeletePhotoCheck))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PickInfo);
