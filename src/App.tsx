import './App.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faImages, faBook, faFileArrowUp } from '@fortawesome/free-solid-svg-icons'

import PhotoList from "./containers/photoList";
import PhotoCount from "./containers/photoCount";
import PhotoBrowse from './containers/photoBrowse';

function App() {
  return (
    <div className="App">
      <PhotoCount />
      <PhotoList />
      <div className="toolbar">
        <div className="progress"></div>
        <ul>
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
      </div>
      <div className="uploader">
        <FontAwesomeIcon icon={faFileArrowUp} size="2x" />
        <input id="file" multiple type="file" />
      </div>
      <PhotoBrowse />
    </div>
  );
}

export default App;
