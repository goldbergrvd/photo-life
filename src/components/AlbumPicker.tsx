import AlbumList from "../containers/fileRepo/AlbumList";
import { State } from "../types";
import "./albumPicker.css";

interface Props {
  state: State,
  cancel: () => void;
}

function AlbumPicker({ state, cancel }: Props) {
  if (state === State.PickAlbum) {
    return (
      <div className="album-picker">
        <div className="container">
          <div className="btn" onClick={cancel}>
            <div className="cancel">取消</div>
          </div>
          <div className="albums">
            <AlbumList />
          </div>
        </div>
      </div>
    )
  }
  return <div className="album-picker hide"></div>
}

export default AlbumPicker;
