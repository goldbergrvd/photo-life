import "./tabs.css"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBook, faImages } from "@fortawesome/free-solid-svg-icons";

function Tabs() {
  return (
    <ul className="tabs">
      <li>
        <FontAwesomeIcon icon={faImages} size="4x" />
        <div>圖庫</div>
      </li>
      <li>
        <FontAwesomeIcon icon={faBook} size="4x" />
        <div>相簿</div>
      </li>
      <li id="de">-</li>
      <li id="in">+</li>
    </ul>
  )
}

export default Tabs;