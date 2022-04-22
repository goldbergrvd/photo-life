import "./photoList.css";
import { PhotoList, State } from "../../types";
import React from "react";
import api from "../../api";
import SelectMask from "./SelectMask";

export interface Props {
  photoList: PhotoList;
  state: State;
  onTogglePhotoSelect: (index: number) => void;
  onOpenPhotoBrowse: (index: number) => void;
  fetchPhotos: (lastPhotoName: string) => void;
}

class PhotoListComponent extends React.Component<Props, object> {

  componentDidMount() {
    const { photoList, fetchPhotos } = this.props

    if (photoList.length === 0) {
      fetchPhotos('')
    } else {
      let lastPhotoName = photoList[photoList.length - 1].name
      fetchPhotos(lastPhotoName)
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
            <div className="img" key={photo.name} onClick={() => this.onImgClick(i)}>
              <img src={api.image(photo.name)} crossOrigin="anonymous" />
              <SelectMask show={photo.selected} />
            </div>
          ))
        }
      </div>
    )
  }
}

export default PhotoListComponent;
