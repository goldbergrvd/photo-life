import "./tabs.css"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBook, faFileVideo, faImages } from "@fortawesome/free-solid-svg-icons";

interface Props {
  isImageRepoTab: boolean;
  isVideoRepoTab: boolean;
  isAlbumTab: boolean;
  toImageRepoTab: () => void;
  toVideoRepoTab: () => void;
  toAlbumTab: () =>  void;
}

function Tabs({ isImageRepoTab, isVideoRepoTab, isAlbumTab, toImageRepoTab, toVideoRepoTab, toAlbumTab }: Props) {
  return (
    <ul className="tabs">
      <li className={isImageRepoTab ? 'on' : ''} onClick={toImageRepoTab}>
        <FontAwesomeIcon icon={faImages} size="4x" />
        <div>圖庫</div>
      </li>
      <li className={isVideoRepoTab ? 'on' : ''} onClick={toVideoRepoTab}>
        <FontAwesomeIcon icon={faFileVideo} size="4x" />
        <div>影片</div>
      </li>
      <li className={isAlbumTab ? 'on' : ''} onClick={toAlbumTab}>
        <FontAwesomeIcon icon={faBook} size="4x" />
        <div>相簿</div>
      </li>
    </ul>
  )
}

export default Tabs;