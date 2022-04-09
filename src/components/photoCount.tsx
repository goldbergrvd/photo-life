import "./photoCount.css"
import { PhotoList } from "../types";

export interface Props {
  photoList: PhotoList
}

function PhotoCount ({ photoList }: Props) {
  return (
    <div className="photo-count">
      { `${photoList.length}張照片` }
    </div>
  )
}

export default PhotoCount;