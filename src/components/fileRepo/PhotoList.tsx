import "./photoList.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck } from "@fortawesome/free-solid-svg-icons";
import { PhotoList, State } from "../../types";
import React from "react";
import api from "../../api";

export interface Props {
  photoList: PhotoList;
  state: State;
  onTogglePhotoSelect: (index: number) => void;
  onOpenPhotoBrowse: (index: number) => void;
  fetchPhotos: () => void;
}

class PhotoListComponent extends React.Component<Props, object> {

  componentDidMount() {
    const {
      photoList,
      fetchPhotos
    } = this.props

    if (photoList.length === 0) {
      fetchPhotos()
    }
  }

  onImgClick(i: number) {
    const {
      state,
      onTogglePhotoSelect,
      onOpenPhotoBrowse
    } = this.props

    if (state === State.Select) {
      onTogglePhotoSelect(i)
    }

    if (state === State.Browse) {
      onOpenPhotoBrowse(i)
    }
  }

  render() {
    const { photoList } = this.props

    return (
      <div className="photo-list img-3">
        {
          photoList.map((photo, i) => (
            <div className="img" key={i} onClick={() => this.onImgClick(i)}>
              <img src={api.image(photo.name)} crossOrigin="anonymous" />
              { photo.selected ? (<div className="mask"><FontAwesomeIcon icon={faCircleCheck} /></div>) : '' }
            </div>
          ))
        }
      </div>
    )
  }
}

export default PhotoListComponent;
