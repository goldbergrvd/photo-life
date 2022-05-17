import AlbumList from "../containers/listview/AlbumList";
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
          <div className="head">
            <div className="title">加入相簿</div>
            <div className="cancel" onClick={cancel}>取消</div>
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
