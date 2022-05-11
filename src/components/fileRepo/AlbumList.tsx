import "./albumList.css";

import api from "../../api";
import { AlbumList, Alert, State } from "../../types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinusCircle } from "@fortawesome/free-solid-svg-icons";

interface Props {
  albumList: AlbumList;
  state: State;
  isBrowsing: boolean;
  browseAlbum: (id: number) => void;
  willDeleteAlbum: (id: number) => void;
  setAlert: (alert: Alert) => void;
}

function AlbumListComponent({ albumList, state, isBrowsing, setAlert, browseAlbum, willDeleteAlbum }: Props) {

  function onAlbumClick(id: number) {
    if (state === State.Browse) {
      browseAlbum(id)
    }
  }

  function onAlbumDelete(id: number) {
    if (state === State.DeleteAlbum) {
      willDeleteAlbum(id)
      setAlert(Alert.DeleteAlbumCheck)
    }
  }

  return (
    <div className={`album-list ${isBrowsing ? 'unscroll' : ''}`}>
      {
        albumList.map(album => (
          <div className="item" key={album.id} onClick={() => onAlbumClick(album.id)}>
            <div className="thumbnails">
              {
                album.photoList.slice(0, 16).map(photo => (
                  <img src={api.imageXs(photo.name)} alt="" key={photo.name} />
                ))
              }
            </div>
            <div className="title">{album.name}</div>
            <div className="count">{album.photoList.length}</div>
            {state === State.DeleteAlbum ? <div className="delete" onClick={() => onAlbumDelete(album.id)}><FontAwesomeIcon icon={faMinusCircle} /></div> : ''}
          </div>
        ))
      }
    </div>
  )
}

export default AlbumListComponent;
