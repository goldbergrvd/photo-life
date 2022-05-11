import { connect } from "react-redux";
import { Dispatch } from "redux";
import { setState, StateAction } from "../actions";
import AlbumCreator from "../components/AlbumCreator";
import { State, StoreState } from "../types";

function mapStateToProps(state: StoreState) {
  return {
    state: state.state
  }
}

function mapDispatchToProps(dispatch: Dispatch<StateAction>) {
  return {
    submit: (name: string) => {
      console.log(name)
    },
    cancel: () => dispatch(setState(State.Browse))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AlbumCreator);
