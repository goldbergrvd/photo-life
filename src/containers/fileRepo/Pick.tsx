import { connect } from "react-redux";
import { Dispatch } from "redux";
import { setState, StateAction } from "../../actions";
import { clearPhotoSelect, PhotoListAction } from "../../actions/photoList";
import { clearVideoSelect, VideoAction } from "../../actions/videoList";
import Pick from "../../components/fileRepo/Pick";
import { State, StoreState } from "../../types";

function mapStateToProps(state: StoreState) {
  return {
    tab: state.tab,
    state: state.state
  }
}

function mapDispatchToProps(dispatch: Dispatch<StateAction | PhotoListAction | VideoAction>) {
  return {
    setState: (state: State) => dispatch(setState(state)),
    clearPhotoSelect: () => dispatch(clearPhotoSelect()),
    clearVideoSelect: () => dispatch(clearVideoSelect())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Pick)