import { connect } from "react-redux";
import { Dispatch } from "redux";
import { setState, StateAction } from "../actions";
import AlbumPicker from "../components/AlbumPicker";
import { State, StoreState } from "../types";

function mapStateToProps(state: StoreState) {
  return {
    state: state.state
  }
}

function mapDispatchToProps(dispatch: Dispatch<StateAction>) {
  return {
    cancel: () => dispatch(setState(State.Select))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AlbumPicker);
