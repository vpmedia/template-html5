import 'babel-polyfill';
import 'pixi';
import 'p2';
import Phaser from 'phaser';
import React, { PropTypes } from 'react';
import ReactDOM from 'react-dom';
import Main from '../common/main';

/*import BootState from './states/Boot'
import SplashState from './states/Splash'
import GameState from './states/Game'*/

class Game extends Phaser.Game {

  constructor () {
    let width = document.documentElement.clientWidth > 800 ? 800 : document.documentElement.clientWidth;
    let height = document.documentElement.clientHeight > 600 ? 600 : document.documentElement.clientHeight;

    super(width, height, Phaser.AUTO, null, null);

    /*this.state.add('Boot', BootState, false);
    this.state.add('Splash', SplashState, false);
    this.state.add('Game', GameState, false);
    this.state.start('Boot');*/
  }
}

window.game = new Game();

const main = new Main('HTML5 Phaser / React example using ES6');

const App = props => (
  <div>
    {props.message}
  </div>
);

App.propTypes = {
  message: PropTypes.string.isRequired,
};

const appMessage = main.init();
ReactDOM.render(<App message={appMessage} />, document.querySelector('.app'));
//document.querySelector('.app').innerText = appMessage;
