import "./albumList.css";

import { APIS as api } from "../../api";
import { Album, AlbumList } from "../../types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinusCircle } from "@fortawesome/free-solid-svg-icons";
import React from "react";

interface Props {
  albumList: AlbumList;
  paddingClass: 'no-padding' | '';
  unscrollClass: 'unscroll' | '';
  isDeleteAlbumState: boolean;
  onAlbumClick: (id: string) => void;
  onAlbumDelete: (id: string) => void;
  fetchAlbums: () => void;
}

class AlbumListComponent extends React.Component<Props, object> {

  thumbnailsCount(album: Album) {
    const photoCount = album.photoList.length
    if (photoCount < 4) return 1
    if (photoCount < 9) return 4
    if (photoCount < 16) return 9
    return 16
  }

  componentDidMount() {
    const { albumList, fetchAlbums } = this.props
    if (albumList.length === 0) {
      fetchAlbums()
    }
  }

  render() {
    const { albumList, paddingClass, unscrollClass, isDeleteAlbumState, onAlbumClick, onAlbumDelete } = this.props
    return (
      <div className={`album-list ${paddingClass} ${unscrollClass}`}>
        {
          albumList.map(album => (
            <div className="item" key={album.id} onClick={() => onAlbumClick(album.id)}>
              <div className={`thumbnails thumbnails-${this.thumbnailsCount(album)}`}>
                {
                  album.photoList.slice(0, this.thumbnailsCount(album)).map(photo => (
                    <img src={api.imageXs(photo.name)} crossOrigin="anonymous" alt="" key={photo.name} />
                  ))
                }
              </div>
              <div className="title">{album.name}</div>
              <div className="count">{album.photoList.length}</div>
              {isDeleteAlbumState ? <div className="delete" onClick={() => onAlbumDelete(album.id)}><FontAwesomeIcon icon={faMinusCircle} /></div> : ''}
            </div>
          ))
        }
      </div>
    )
  }
}

export default AlbumListComponent;
