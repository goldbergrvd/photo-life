import './App.css';
import AlbumPicker from './containers/AlbumPicker';
import AlbumCreator from './containers/AlbumCreator';
import Alert from './containers/Alert';
import Header from './containers/header/Header';
import Messages from './containers/Messages';
import PhotoBrowse from './containers/PhotoBrowse';
import Toolbar from './containers/toolbar/Toolbar';
import ViewSwitch from './containers/view/ViewSwitch';
import { detectBrowser } from './native-dom'
import PhotoPicker from './containers/PhotoPicker';

function App() {
  const browser = detectBrowser()

  return (
    <div className={`App ${browser}`}>
      <ViewSwitch />
      <Header />
      <Toolbar />
      <Alert />
      <AlbumCreator />
      <AlbumPicker />
      <PhotoPicker />
      <Messages />
      <PhotoBrowse />
    </div>
  );
}

export default App;
