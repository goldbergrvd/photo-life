import "./albumList.css";

import { APIS as api } from "../../api";
import { AlbumList, Alert, State } from "../../types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinusCircle } from "@fortawesome/free-solid-svg-icons";
import React from "react";

interface Props {
  albumList: AlbumList;
  state: State;
  isBrowsing: boolean;
  browseAlbum: (id: string) => void;
  willDeleteAlbum: (id: string) => void;
  setAlert: (alert: Alert) => void;
  fetchAlbums: () => void;
}

class AlbumListComponent extends React.Component<Props, object> {

  onAlbumClick(id: string) {
    const { state, browseAlbum } = this.props
    if (state === State.Browse) {
      browseAlbum(id)
    }
  }

  onAlbumDelete(id: string) {
    const { state, willDeleteAlbum, setAlert } = this.props
    if (state === State.DeleteAlbum) {
      willDeleteAlbum(id)
      setAlert(Alert.DeleteAlbumCheck)
    }
  }

  componentDidMount() {
    const { albumList, fetchAlbums } = this.props
    if (albumList.length === 0) {
      fetchAlbums()
    }
  }

  render() {
    const { albumList, state, isBrowsing } = this.props
    return (
      <div className={`album-list ${isBrowsing ? 'unscroll' : ''}`}>
        {
          albumList.map(album => (
            <div className="item" key={album.id} onClick={() => this.onAlbumClick(album.id)}>
              <div className="thumbnails">
                {
                  album.photoList.slice(0, 16).map(photo => (
                    <img src={api.imageXs(photo.name)} alt="" key={photo.name} />
                  ))
                }
              </div>
              <div className="title">{album.name}</div>
              <div className="count">{album.photoList.length}</div>
              {state === State.DeleteAlbum ? <div className="delete" onClick={() => this.onAlbumDelete(album.id)}><FontAwesomeIcon icon={faMinusCircle} /></div> : ''}
            </div>
          ))
        }
      </div>
    )
  }
}

export default AlbumListComponent;
