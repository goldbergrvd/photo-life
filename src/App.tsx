import './App.css';

import PhotoBrowse from './containers/PhotoBrowse';
import Toolbar from './containers/toolbar/Toolbar';
import ViewSwitch from './containers/ViewSwitch';

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
