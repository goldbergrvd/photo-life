import './App.css';

import Alert from './containers/Alert';
import PhotoBrowse from './containers/PhotoBrowse';
import Toolbar from './containers/toolbar/Toolbar';
import ViewSwitch from './containers/ViewSwitch';

function App() {
  return (
    <div className="App">
      <ViewSwitch />
      <Toolbar />
      <PhotoBrowse />
      <Alert />
    </div>
  );
}

export default App;
