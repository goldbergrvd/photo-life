import "./pickInfo.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUpRightFromSquare, faTrashCan } from "@fortawesome/free-solid-svg-icons";

export interface Props {
  amount: number;
  deleteAlert: () => void;
  pickAlbum: () => void;
}

function PickInfo({ amount, deleteAlert, pickAlbum }: Props) {
  return (
    <div className="pick-info">
      <div className="pick-album" onClick={pickAlbum}>
        <FontAwesomeIcon icon={faArrowUpRightFromSquare} />
      </div>
      <div className="info">
        {amount === 0 ? '選取項目' : `已選取${amount}個項目`}
      </div>
      <div className="delete" onClick={deleteAlert}>
        <FontAwesomeIcon icon={faTrashCan} />
      </div>
    </div>
  )
}

export default PickInfo;
