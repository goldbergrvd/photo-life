import "./pickInfo.css"
import { Alert, PhotoList, Tab } from "../../types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUpRightFromSquare, faTrashCan } from "@fortawesome/free-solid-svg-icons";

export interface Props {
  tab: Tab;
  photoList: PhotoList;
  deleteAlert: (alert: Alert) => void
}

function PickInfo({ tab, photoList, deleteAlert }: Props) {
  const amount = photoList.filter(photo => photo.selected).length

  function onDeleteClick() {
    if (tab === Tab.ImageRepo) {
      deleteAlert(Alert.DeletePhotoCheck)
    }

    if (tab === Tab.VideoRepo) {
      deleteAlert(Alert.DeleteVideoCheck)
    }
  }

  return (
    <div className="pick-info">
      <div className="handle">
      <FontAwesomeIcon icon={faArrowUpRightFromSquare} />
      </div>
      <div className="info">{amount === 0 ? '選取項目' : `已選取${amount}個項目`}</div>
      <div className="delete" onClick={onDeleteClick}>
        <FontAwesomeIcon icon={faTrashCan} />
      </div>
    </div>
  )
}

export default PickInfo;
