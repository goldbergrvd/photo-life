import './App.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFileArrowUp } from '@fortawesome/free-solid-svg-icons'

import PhotoList from "./containers/photoList";
import PhotoCount from "./containers/photoCount";
import PhotoBrowse from './containers/photoBrowse';
import Toolbar from './containers/toolbar/toolbar';
import Pick from './containers/settings/pick';

function App() {
  return (
    <div className="App">
      <PhotoCount />
      <PhotoList />
      <Toolbar />
      <div className="uploader">
        <FontAwesomeIcon icon={faFileArrowUp} size="2x" />
        <input id="file" multiple type="file" />
      </div>
      <Pick />
      <PhotoBrowse />
    </div>
  );
}

export default App;
