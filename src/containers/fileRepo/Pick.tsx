import { connect } from "react-redux";
import { Dispatch } from "redux";
import { setState, StateAction } from "../../actions";
import { clearPhotoSelect, PhotoListAction } from "../../actions/photoList";
import Pick from "../../components/fileRepo/Pick";
import { State, StoreState } from "../../types";

function mapStateToProps(state: StoreState) {
  return {
    state: state.state
  }
}

function mapDispatchToProps(dispatch: Dispatch<StateAction | PhotoListAction>) {
  return {
    setState: (state: State) => dispatch(setState(state)),
    clearPhotoSelect: () => dispatch(clearPhotoSelect())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Pick)