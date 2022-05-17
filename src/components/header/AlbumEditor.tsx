import { faAngleLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./albumEditor.css";

interface Props {
  addText: string;
  deleteText: string;
  selectText: string;
  isBrowsing: boolean;
  onAddClick: () => void;
  onDeleteClick: () => void;
  onSelectClick: () => void;
  closeBrowsing: () => void;
}

function AlbumEditor({ addText, deleteText, selectText, isBrowsing, onAddClick, onDeleteClick, onSelectClick, closeBrowsing }: Props) {
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
