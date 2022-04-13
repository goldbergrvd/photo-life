import "./setting.css"

import { faPlus } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

function Uploader() {
  return (
    <div className="setting uploader">
      <FontAwesomeIcon icon={faPlus} />
      <input id="file" multiple type="file" />
    </div>
  )
}

export default Uploader;
