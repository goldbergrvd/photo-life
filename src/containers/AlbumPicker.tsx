import { connect } from "react-redux";
import { Dispatch } from "redux";
import { setState, StateAction } from "../actions";
import AlbumPicker from "../components/AlbumPicker";
import { State, StoreState, Tab } from "../types";

function mapStateToProps(state: StoreState) {
  return {
    displayNone: state.tab !== Tab.ImageRepo,
    show: [State.PickAlbum, State.UpdateAlbum].includes(state.state) && state.tab === Tab.ImageRepo,
    submiting: state.state === State.UpdateAlbum
  }
}

function mapDispatchToProps(dispatch: Dispatch<StateAction>) {
  return {
    cancel: () => dispatch(setState(State.Select))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AlbumPicker);
