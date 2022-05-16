import { faAngleLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { State } from "../../types";
import "./albumEditor.css";

interface Props {
  addText: string;
  deleteText: string;
  selectText: string;
  state: State;
  isBrowsing: boolean;
  setState: (state: State) => void;
  closeBrowsing: () => void;
  clearAlbumPhotoSelect: () => void;
}

function AlbumEditor({ addText, deleteText, selectText, state, isBrowsing, setState, closeBrowsing, clearAlbumPhotoSelect }: Props) {

  function onAddClick() {
    if (state === State.AddAlbum) {
      setState(State.Browse)
    } else {
      setState(State.AddAlbum)
    }
  }

  function onDeleteClick() {
    if (state === State.DeleteAlbum) {
      setState(State.Browse)
    } else {
      setState(State.DeleteAlbum)
    }
  }

  function onSelectClick() {
    if (state === State.Select) {
      clearAlbumPhotoSelect()
    } else {
      setState(State.Select)
    }
  }

  return (
    <div className="album-editor">
      {!isBrowsing ? <div className="add" onClick={onAddClick}>{addText}</div> : ''}
      {!isBrowsing ? <div className="delete" onClick={onDeleteClick}>{deleteText}</div> : ''}
      {isBrowsing ? <div className="back" onClick={closeBrowsing}><FontAwesomeIcon icon={faAngleLeft} />{' 相簿'}</div> : ''}
      {isBrowsing ? <div className="select" onClick={onSelectClick}>{selectText}</div> : ''}
    </div>
  )
}

export default AlbumEditor;
