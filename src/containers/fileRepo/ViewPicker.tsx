import { connect } from "react-redux";
import { Dispatch } from "redux";
import { setViewType, ViewTypeAction } from "../../actions";
import ViewPicker from "../../components/fileRepo/ViewPicker";
import { StoreState, ViewType } from "../../types";

function mapStateToProps(state: StoreState) {
  return {
    viewType: state.viewType
  }
}

function mapDispatchToProps(dispatch: Dispatch<ViewTypeAction>) {
  return {
    setViewType: (viewType: ViewType) => dispatch(setViewType(viewType))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ViewPicker);
