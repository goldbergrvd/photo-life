import './App.css';

import PhotoBrowse from './containers/photoBrowse';
import Toolbar from './containers/toolbar/toolbar';
import ViewSwitch from './containers/viewSwitch';

function App() {
  return (
    <div className="App">
      <ViewSwitch />
      <Toolbar />
      <PhotoBrowse />
    </div>
  );
}

export default App;
