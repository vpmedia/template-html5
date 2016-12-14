import 'pixi';
import 'p2';
import Phaser from 'phaser';

/*
import BootState from './states/Boot'
import SplashState from './states/Splash'
import GameState from './states/Game'
*/

class Game extends Phaser.Game {

  constructor() {
    const clientWidth = document.documentElement.clientWidth;
    const clientHeight = document.documentElement.clientHeight;
    const width = clientWidth > 800 ? 800 : clientWidth;
    const height = clientHeight > 600 ? 600 : clientHeight;

    super(width, height, Phaser.AUTO, null, null);

    /*
    this.state.add('Boot', BootState, false);
    this.state.add('Splash', SplashState, false);
    this.state.add('Game', GameState, false);
    this.state.start('Boot');
    */
  }
}

module.exports = Game;
