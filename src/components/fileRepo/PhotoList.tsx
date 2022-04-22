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

let ele: HTMLDivElement
let prevFetchTime = new Date()
let prevScrollY: number

function isRemainOneScreenHeight () {
  return ele.offsetHeight - window.scrollY < window.innerHeight * 2
}

function isScrollDown () {
  return prevScrollY < window.scrollY
}

function isPassTwoSecond () {
  return new Date().getTime() - prevFetchTime.getTime() > 2000
}

let currentDate: string

class PhotoListComponent extends React.Component<Props, object> {

  dateTag(index: number, name: string) {
    let date = name.substring(0, 8)
    if (index % 3 === 0 && date != currentDate) {
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

  onScroll() {
    const { photoList, fetchPhotos } = this.props

    if (isRemainOneScreenHeight() && isScrollDown() && isPassTwoSecond()) {
      prevFetchTime = new Date()
      let lastPhotoName = photoList[photoList.length - 1].name
      fetchPhotos(lastPhotoName)
    }
    prevScrollY = window.scrollY
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

    document.onscroll = this.onScroll.bind(this)
    window.scrollTo(0, prevScrollY)
  }

  componentWillUnmount() {
    document.onscroll = null
  }

  render() {
    const { photoList } = this.props

    return (
      <div className="photo-list img-3" ref={c => ele = c as HTMLDivElement}>
        {
          photoList.map((photo, i) => (
            <div className="img" key={photo.name} onClick={() => this.onImgClick(i)}>
              <img src={api.image(photo.name)} crossOrigin="anonymous" />
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
