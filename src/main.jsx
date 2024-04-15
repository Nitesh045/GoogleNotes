import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.jsx';
import './index.css';

import { Provider } from 'react-redux'; // Import Provider from react-redux

// store.js
import { createStore } from 'redux';
import reducer from './Redux/Reducer.jsx';


const store = createStore(reducer);





ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
