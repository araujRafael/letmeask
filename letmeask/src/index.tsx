import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
//DataBase
import './Services/Firebase';
//CSS
import './Styles/global.scss'

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

