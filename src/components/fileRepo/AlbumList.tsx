import "./albumList.css";

import { APIS as api } from "../../api";
import { Album, AlbumList, Alert, State } from "../../types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinusCircle } from "@fortawesome/free-solid-svg-icons";
import React from "react";

interface Props {
  albumList: AlbumList;
  pickedPhotoNames: string[];
  state: State;
  isBrowsing: boolean;
  browseAlbum: (id: string) => void;
  willDeleteAlbum: (id: string) => void;
  setAlert: (alert: Alert) => void;
  fetchAlbums: () => void;
  addAlbumPhoto: (id: string, photoNames: string[]) => void;
}

class AlbumListComponent extends React.Component<Props, object> {

  thumbnailsCount(album: Album) {
    const photoCount = album.photoList.length
    if (photoCount < 4) return 1
    if (photoCount < 9) return 4
    if (photoCount < 16) return 9
    return 16
  }

  onAlbumClick(id: string) {
    const { pickedPhotoNames, state, browseAlbum, addAlbumPhoto } = this.props
    if (state === State.Browse) {
      browseAlbum(id)
    }
    if (state === State.PickAlbum) {
      addAlbumPhoto(id, pickedPhotoNames)
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
      <div className={`album-list ${state === State.PickAlbum ? 'no-padding' : ''} ${isBrowsing ? 'unscroll' : ''}`}>
        {
          albumList.map(album => (
            <div className="item" key={album.id} onClick={() => this.onAlbumClick(album.id)}>
              <div className={`thumbnails thumbnails-${this.thumbnailsCount(album)}`}>
                {
                  album.photoList.slice(0, this.thumbnailsCount(album)).map(photo => (
                    <img src={api.imageXs(photo.name)} crossOrigin="anonymous" alt="" key={photo.name} />
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
