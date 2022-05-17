import './index.css';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { Alert, State, Tab, ViewType } from './types';
import App from './App';
import reducers from './reducers'
import reportWebVitals from './reportWebVitals';

const DEFAULT_STATE = {
  tab: Tab.ImageRepo,
  state: State.Browse,
  viewType: ViewType.Day,
  alert: Alert.None,
  photoList: [],
  videoList: [],
  albumList: [],
  uploadProgress: 0,
  display: {
    photoBrowseInfo: true,
    videoControls: true
  },
  messages: new Map()
}

const store = createStore(reducers, DEFAULT_STATE)

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
