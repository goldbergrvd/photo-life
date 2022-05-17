import "./selectMask.css";

import { faCircleCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface Props {
  show: boolean;
}

function SelectMask({ show }: Props) {
  return (
    <div className={'mask' + (show ? '' : ' hide')}><FontAwesomeIcon icon={faCircleCheck} /></div>
  )
}

export default SelectMask;
