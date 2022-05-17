import { connect } from "react-redux";
import { Dispatch } from "redux";
import { setState, StateAction } from "../../actions";
import { clearPhotoSelect, PhotoListAction } from "../../actions/photoList";
import { clearVideoSelect, VideoAction } from "../../actions/videoList";
import Pick from "../../components/fileRepo/Pick";
import { State, StoreState, Tab } from "../../types";

interface StateProps {
  contentText: string;
  tab: Tab;
  state: State;
}

interface DispatchProps {
  setState: (state: State) => void;
  clearPhotoSelect: () => void;
  clearVideoSelect: () => void;
}

function mapStateToProps(state: StoreState): StateProps {
  let contentText = '選取'
  switch (state.state) {
    case State.Browse:
      contentText = '選取'
      break
    case State.Select:
      contentText = '取消'
      break
  }
  return {
    contentText,
    tab: state.tab,
    state: state.state
  }
}

function mapDispatchToProps(dispatch: Dispatch<StateAction | PhotoListAction | VideoAction>): DispatchProps {
  return {
    setState: (state: State) => dispatch(setState(state)),
    clearPhotoSelect: () => dispatch(clearPhotoSelect()),
    clearVideoSelect: () => dispatch(clearVideoSelect())
  }
}

function mergeProps(stateProps: StateProps, dispatchProps: DispatchProps) {
  return {
    contentText: stateProps.contentText,
    onClick: () => {
      switch (stateProps.state) {
        case State.Browse:
          dispatchProps.setState(State.Select)
          return
        case State.Select:
          dispatchProps.setState(State.Browse)
          if (stateProps.tab === Tab.ImageRepo) {
            dispatchProps.clearPhotoSelect()
          }
          if (stateProps.tab === Tab.VideoRepo) {
            dispatchProps.clearVideoSelect()
          }
          return
      }
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(Pick)