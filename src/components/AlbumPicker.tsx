import AlbumList from "../containers/listview/AlbumList";
import UploadProgress from "../containers/toolbar/UploadProgress";
import "./picker.css";

interface Props {
  displayNone: boolean;
  show: boolean;
  submiting: boolean;
  cancel: () => void;
}

function AlbumPicker({ displayNone, show, submiting, cancel }: Props) {
  if (!displayNone) {
    return (
      <div className={`picker album-picker ${show ? 'show' : ''}`}>
        <div className={`container ${show ? 'show' : ''}`}>
          <div className="head">
            {!submiting ? <div className="title">加入相簿</div> : ''}
            {!submiting ? <div className="cancel" onClick={cancel}>取消</div> : ''}
            {submiting ? <UploadProgress /> : ''}
          </div>
          <div className="items">
            <AlbumList />
          </div>
        </div>
      </div>
    )
  }
  return <div className="picker album-picker hide"></div>
}

export default AlbumPicker;
