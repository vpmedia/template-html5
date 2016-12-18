//
// include poly-fills
//
// order is mandatory
import 'babel-polyfill';  // required by core
import 'promise-polyfill';  // required by fetch.js
//
// include project dependencies
//
// react core classes
import React, { PropTypes } from 'react';
import ReactDOM from 'react-dom';
// shared class example
import Main from '../common/main';
// phaser game example
import Game from './game';
// define react application
const App = props => (
  <div>
    {props.message}
  </div>
);
// define parameter constraints
App.propTypes = {
  message: PropTypes.string.isRequired,
};
// initialize React
const main = new Main('HTML5 Phaser / React example using ES6');
const appMessage = main.init();
// document.querySelector('.app').innerText = appMessage;
ReactDOM.render(<App message={appMessage} />, document.querySelector('.app'));
// initialize Phaser
window.game = new Game();
