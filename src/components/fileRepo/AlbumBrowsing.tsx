import "./albumBrowsing.css";
import { Album } from "../../types";
import api from "../../api";
import SelectMask from "./SelectMask";

interface Props {
  album: Album | null;
}

function AlbumBrowsing({ album }: Props) {
  if (album) {
    return (
      <div className="album-browsing show">
        {
          album.photoList.map(photo => (
            <div className="img" key={photo.name}>
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
