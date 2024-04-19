import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.jsx';
import './index.css';

import { Provider } from 'react-redux'; // Import Provider from react-redux

// store.js
import { createStore ,applyMiddleware} from 'redux';
import reducer from './Redux/Reducer.jsx';
import {thunk} from 'redux-thunk'


const store = createStore(
  reducer,
  applyMiddleware(thunk)
);





ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
