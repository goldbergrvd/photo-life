import "./tabs.css"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBook, faFileVideo, faImages } from "@fortawesome/free-solid-svg-icons";
import { Tab } from "../../types";

interface Props {
  tab: Tab;
  setTab: (tab: Tab) => void
}

function Tabs({ tab, setTab }: Props) {
  return (
    <ul className="tabs">
      <li className={tab === Tab.ImageRepo ? 'on' : ''} onClick={ () => setTab(Tab.ImageRepo) }>
        <FontAwesomeIcon icon={faImages} size="4x" />
        <div>圖庫</div>
      </li>
      <li className={tab === Tab.VideoRepo ? 'on' : ''} onClick={ () => setTab(Tab.VideoRepo) }>
        <FontAwesomeIcon icon={faFileVideo} size="4x" />
        <div>影片</div>
      </li>
      <li className={tab === Tab.Album ? 'on' : ''} onClick={ () => setTab(Tab.Album) }>
        <FontAwesomeIcon icon={faBook} size="4x" />
        <div>相簿</div>
      </li>
    </ul>
  )
}

export default Tabs;