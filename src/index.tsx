import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import reducers from './reducers'
import { State, Tab } from './types';
import { createStore } from 'redux';

const DEFAULT_STATE = {
  tab: Tab.ImageRepo,
  state: State.Browse,
  photoList: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10',
              '11', '12', '13', '14', '15', '16', '17', '18', '19', '20',
              '21', '22', '23', '24', '25']
              .map(name => ({ name: `${name}.jpeg`, browsed: false, selected: false })),
  uploadProgress: 0
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
