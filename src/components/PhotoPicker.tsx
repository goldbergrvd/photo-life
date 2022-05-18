import "./picker.css";
import PhotoList from "../containers/listview/PhotoList";
import { Album } from "../types";
import UploadProgress from "../containers/toolbar/UploadProgress";

interface Props {
  browsingAlbum: Album | null;
  show: boolean;
  submiting: boolean;
  cancel: () => void;
  submit: () => void;
}

function PhotoPicker({ browsingAlbum, show, submiting, cancel, submit }: Props) {
  if (browsingAlbum) {
    return (
      <div className={`picker photo-picker ${show ? 'show' : ''}`}>
        <div className={`container ${show ? 'show' : ''}`}>
          <div className="head">
            {!submiting ? <div className="cancel" onClick={cancel}>取消</div> : ''}
            {!submiting ? <div className="title">添加至{browsingAlbum!.name}</div> : ''}
            {!submiting ? <div className="submit" onClick={submit}>確定</div> : ''}
            {submiting ? <UploadProgress /> : ''}
          </div>
          <div className="items">
            <PhotoList />
          </div>
        </div>
      </div>
    )
  }
  return <div className="picker photo-picker hide"></div>
}

export default PhotoPicker;