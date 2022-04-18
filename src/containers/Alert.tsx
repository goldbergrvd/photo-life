import axios from "axios";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { AlertAction, setAlert, setState, StateAction } from "../actions";
import { deletePhotos, PhotoListAction } from "../actions/photoList";
import api from "../api";
import Alert from "../components/Alert";
import { Alert as AlertState, State, StoreState } from "../types";

function mapStateToProps(state: StoreState) {
  return {
    alertState: state.alert,
    photoList: state.photoList
  }
}

function mapDispatchToProps(dispatch: Dispatch<AlertAction | PhotoListAction | StateAction>) {
  return {
    onDeletePhotos: (names: string[]) => {
      dispatch(setAlert(AlertState.DeletePhoto))

      axios.delete(api.delete, {
        headers: { 'Content-Type': 'application/json' },
        data: names
      })
      .then(res => {
        let deletedMap = new Map<string, boolean>(Object.entries(res.data))
        dispatch(deletePhotos(deletedMap))
      })
      .catch(err => console.log(err))
      .finally(() => {
        setTimeout(() => {
          dispatch(setAlert(AlertState.None))
          dispatch(setState(State.Browse))
        }, 1500)
      })
    },
    onCancel: () => dispatch(setAlert(AlertState.None))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Alert);
