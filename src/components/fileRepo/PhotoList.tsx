import "./photoList.css";
import { PhotoList, State } from "../../types";
import React from "react";
import api from "../../api";
import SelectMask from "./SelectMask";
import { ScrollTrigger } from "../../native-dom"

export interface Props {
  photoList: PhotoList;
  state: State;
  onTogglePhotoSelect: (index: number) => void;
  onOpenPhotoBrowse: (index: number) => void;
  fetchPhotos: (lastPhotoName: string) => void;
}

let scrollTrigger: ScrollTrigger
let currentDate: string

class PhotoListComponent extends React.Component<Props, object> {

  dateTag(index: number, name: string) {
    let date = name.substring(0, 8)
    if (index % 3 === 0 && date !== currentDate) {
      currentDate = date
      return (
        <div className="date-tag">
          <span className="year">{date.substring(0, 4) + '年'}</span>
          <span className="month">{date.substring(4, 6) + '月'}</span>
          <span className="day">{date.substring(6, 8) + '日'}</span>
        </div>
      )
    }
  }

  fetchNewPhotos() {
    const { photoList, fetchPhotos } = this.props

    let lastPhotoName = photoList[photoList.length - 1].name
    fetchPhotos(lastPhotoName)
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

  componentDidMount() {
    const { photoList, fetchPhotos } = this.props

    if (photoList.length === 0) {
      fetchPhotos('')
    }

    scrollTrigger.on(this.fetchNewPhotos.bind(this))
    scrollTrigger.scrollToPrevY()
  }

  componentWillUnmount() {
    scrollTrigger.off()
  }

  render() {
    const { photoList } = this.props

    return (
      <div className="photo-list img-3" ref={c => scrollTrigger = scrollTrigger || new ScrollTrigger(c as HTMLDivElement)}>
        {
          photoList.map((photo, i) => (
            <div className="img" key={photo.name} onClick={() => this.onImgClick(i)}>
              <img src={api.imageXs(photo.name)} crossOrigin="anonymous" alt="" />
              {this.dateTag(i, photo.name)}
              <SelectMask show={photo.selected} />
            </div>
          ))
        }
      </div>
    )
  }
}

export default PhotoListComponent;
