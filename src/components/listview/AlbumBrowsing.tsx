import "./albumBrowsing.css";
import { Album } from "../../types";
import { APIS as api } from "../../api";
import SelectMask from "./SelectMask";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

interface Props {
  album: Album | null;
  onAddPhotoClick: () => void;
  onImgClick: (index: number) => void;
}

function AlbumBrowsing({ album, onAddPhotoClick, onImgClick }: Props) {
  if (album) {
    return (
      <div className="album-browsing show">
        <div className="add" onClick={onAddPhotoClick}>
          <FontAwesomeIcon icon={faPlus} />
          <div className="tip">新增相片</div>
        </div>
        {
          album.photoList.map((photo, i) => (
            <div className="img" key={photo.name} onClick={() => onImgClick(i)}>
              <img src={api.imageXs(photo.name)} crossOrigin="anonymous" alt="" />
              <SelectMask show={photo.selected} />
            </div>
          ))
        }
      </div>
    )
  }

  return (
    <div className="album-browsing"></div>
  )
}

export default AlbumBrowsing;
