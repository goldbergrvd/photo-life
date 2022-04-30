import './App.css';

import Alert from './containers/Alert';
import Messages from './containers/Messages';
import PhotoBrowse from './containers/PhotoBrowse';
import Toolbar from './containers/toolbar/Toolbar';
import ViewSwitch from './containers/ViewSwitch';
import { detectBrowser } from './native-dom'

function App() {
  const browser = detectBrowser()

  return (
    <div className={`App ${browser}`}>
      <ViewSwitch />
      <Messages />
      <Toolbar />
      <PhotoBrowse />
      <Alert />
    </div>
  );
}

export default App;
