import "./pickInfo.css"
import { PhotoList } from "../../types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUpRightFromSquare, faTrashCan } from "@fortawesome/free-solid-svg-icons";

export interface Props {
  photoList: PhotoList;
  deleteAlert: () => void
}

function PickInfo({ photoList, deleteAlert }: Props) {
  const amount = photoList.filter(photo => photo.selected).length

  return (
    <div className="pick-info">
      <div className="handle">
      <FontAwesomeIcon icon={faArrowUpRightFromSquare} />
      </div>
      <div className="info">{amount === 0 ? '選取項目' : `已選取${amount}個項目`}</div>
      <div className="delete" onClick={deleteAlert}>
        <FontAwesomeIcon icon={faTrashCan} />
      </div>
    </div>
  )
}

export default PickInfo;
