import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import reducers from './reducers'
import { Alert, State, Tab } from './types';
import { createStore } from 'redux';

const DEFAULT_STATE = {
  tab: Tab.ImageRepo,
  state: State.Browse,
  alert: Alert.None,
  photoList: [],
  videoList: [],
  uploadProgress: 0,
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
