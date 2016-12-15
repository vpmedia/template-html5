import 'babel-polyfill';
import React, { PropTypes } from 'react';
import ReactDOM from 'react-dom';
import Main from '../common/main';
import Game from './game';

const App = props => (
  <div>
    {props.message}
  </div>
);

App.propTypes = {
  message: PropTypes.string.isRequired,
};

// initialize Phaser
window.game = new Game();

// initialize React
const main = new Main('HTML5 Phaser / React example using ES6');
const appMessage = main.init();
//document.querySelector('.app').innerText = appMessage;
ReactDOM.render(<App message={appMessage} />, document.querySelector('.app'));
