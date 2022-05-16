import { connect } from "react-redux";
import { Dispatch } from "redux";
import { addErrorMessage, addInfoMessage, MessagesAction, setState, StateAction } from "../actions";
import { addAlbum, AlbumListAction } from "../actions/albumList";
import requests from "../api";
import AlbumCreator from "../components/AlbumCreator";
import { State, StoreState } from "../types";

function mapStateToProps(state: StoreState) {
  return {
    state: state.state
  }
}

function mapDispatchToProps(dispatch: Dispatch<AlbumListAction | StateAction | MessagesAction>) {
  return {
    submit: (name: string) => {
      requests.addAlbum(name)
        .then(album => {
          dispatch(addAlbum([album]))
          dispatch(addInfoMessage('新增成功', `相簿「${album.name}」被建立`))
        })
        .catch(err => {
          console.log(err)
          dispatch(addErrorMessage('新增相簿時發生異常', err.response.data))
        })
        .finally(() => {
          dispatch(setState(State.Browse))
        })
    },
    cancel: () => dispatch(setState(State.Browse))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AlbumCreator);
