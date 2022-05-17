import { connect } from "react-redux";
import { Dispatch } from "redux";
import { AlertAction, setAlert, setState, StateAction } from "../../actions";
import PickInfo from "../../components/toolbar/PickInfo";
import { Alert, State, StoreState, Tab } from "../../types";

interface StateProps {
  amount: number;
  tab: Tab;
}

interface DispatchProps {
  dispatchAlert: (alert: Alert) => void;
  pickAlbum: () => void;
}

function mapStateToProps(state: StoreState): StateProps {
  let amount
  switch(state.tab) {
    case Tab.ImageRepo:
      amount = state.photoList.filter(p => p.selected).length
      break
    case Tab.VideoRepo:
      amount = state.videoList.filter(p => p.selected).length
      break
    case Tab.Album:
      amount = state.albumList.find(a => a.browsing)?.photoList.filter(p => p.selected).length
      break
  }
  return {
    amount: amount || 0,
    tab: state.tab
  }
}

function mapDispatchToProps(dispatch: Dispatch<AlertAction | StateAction>): DispatchProps {
  return {
    dispatchAlert: (alert: Alert) => dispatch(setAlert(alert)),
    pickAlbum: () => dispatch(setState(State.PickAlbum))
  }
}

function mergeProps(stateProps: StateProps, dispatchProps: DispatchProps) {
  return {
    amount: stateProps.amount,
    pickAlbum: dispatchProps.pickAlbum,
    deleteAlert: () => {
      switch(stateProps.tab) {
        case Tab.ImageRepo:
          dispatchProps.dispatchAlert(Alert.DeletePhotoCheck)
          break
        case Tab.VideoRepo:
          dispatchProps.dispatchAlert(Alert.DeleteVideoCheck)
          break
        case Tab.Album:
          dispatchProps.dispatchAlert(Alert.DeleteAlbumPhotoCheck)
          break
      }
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(PickInfo);
