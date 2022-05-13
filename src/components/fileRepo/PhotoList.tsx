import "./photoList.css";
import { PhotoList, State, ViewType } from "../../types";
import React from "react";
import { APIS as api } from "../../api";
import SelectMask from "./SelectMask";
import { ScrollTrigger } from "../../native-dom"

export interface Props {
  photoList: PhotoList;
  state: State;
  viewType: ViewType;
  onTogglePhotoSelect: (index: number) => void;
  onOpenPhotoBrowse: (index: number) => void;
  fetchPhotos: (lastPhotoName: string, amount: number) => void;
}

const FETCH_AMOUNT = {
  [ViewType.Year]: 200,
  [ViewType.Month]: 100,
  [ViewType.Day]: 50
}

let scrollTrigger: ScrollTrigger
let currentDate: string

class PhotoListComponent extends React.Component<Props, object> {

  dateTag(index: number, name: string) {
    const { viewType } = this.props
    let date = (() => {
      if (viewType === ViewType.Year) {
        return name.substring(0, 4)
      } else if (viewType === ViewType.Month) {
        return name.substring(0, 6)
      } else {
        return name.substring(0, 8)
      }
    })()

    if (index % this.getRowItemCount() === 0 && date !== currentDate) {
      currentDate = date
      let notOnlyYear = viewType !== ViewType.Year
      let includeMonth = notOnlyYear
      let includeDay = notOnlyYear && viewType !== ViewType.Month
      return (
        <div className="date-tag">
          <span className={`year ${notOnlyYear ? 'gray' : ''}`}>{date.substring(0, 4) + '年'}</span>
          {includeMonth ? <span className="month">{date.substring(4, 6) + '月'}</span> : ''}
          {includeDay ? <span className="day">{date.substring(6, 8) + '日'}</span> : ''}
        </div>
      )
    }
  }

  getRowItemCount() {
    const { viewType } = this.props
    switch(viewType) {
      case ViewType.Year:
        return 12
      case ViewType.Month:
        return 6
      case ViewType.Day:
        return 3
      default:
        return 3
    }
  }

  fetchNewPhotos() {
    const { photoList, viewType, fetchPhotos } = this.props

    let lastPhotoName = photoList[photoList.length - 1].name
    fetchPhotos(lastPhotoName, FETCH_AMOUNT[viewType])
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

  componentDidUpdate(prevProps: Props) {
    const { photoList, viewType } = this.props
    if (
      prevProps.viewType !== viewType &&
      photoList.length < FETCH_AMOUNT[viewType]
    ) {
      this.fetchNewPhotos()
    }
  }

  componentDidMount() {
    const { photoList, viewType, fetchPhotos } = this.props

    if (photoList.length === 0) {
      fetchPhotos('', FETCH_AMOUNT[viewType])
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
      <div className={`photo-list img-${this.getRowItemCount()}`} ref={c => scrollTrigger = scrollTrigger || new ScrollTrigger(c as HTMLDivElement)}>
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
