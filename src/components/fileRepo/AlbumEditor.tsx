import { faAngleLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { State } from "../../types";
import "./albumEditor.css";

interface Props {
  state: State;
  isBrowsing: boolean;
  setState: (state: State) => void;
  closeBrowsing: () => void;
}

function addText(state: State) {
  if(state === State.AddAlbum) {
    return '取消'
  }
  return '新增'
}

function deleteText(state: State) {
  if(state === State.DeleteAlbum) {
    return '取消'
  }
  return '刪除'
}

function onAddClick(state: State, setState: (state: State) => void) {
  if (state === State.AddAlbum) {
    setState(State.Browse)
  } else {
    setState(State.AddAlbum)
  }
}

function onDeleteClick(state: State, setState: (state: State) => void) {
  if (state === State.DeleteAlbum) {
    setState(State.Browse)
  } else {
    setState(State.DeleteAlbum)
  }
}

function AlbumEditor({ state, isBrowsing, setState, closeBrowsing }: Props) {
  return (
    <div className="album-editor">
      {!isBrowsing ? <div className="add" onClick={() => onAddClick(state, setState)}>{addText(state)}</div> : ''}
      {!isBrowsing ? <div className="delete" onClick={() => onDeleteClick(state, setState)}>{deleteText(state)}</div> : ''}
      {isBrowsing ? <div className="back" onClick={closeBrowsing}><FontAwesomeIcon icon={faAngleLeft} />{' 相簿'}</div> : ''}
      {isBrowsing ? <div className="select">選取</div> : ''}
    </div>
  )
}

export default AlbumEditor;
