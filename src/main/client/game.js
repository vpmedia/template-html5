/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable import/no-unresolved */
/* eslint-disable import/extensions */
import 'pixi';
import 'p2';
import Phaser from 'phaser';

import BootState from './phaser/boot';
import PreloadState from './phaser/preload';
import GameState from './phaser/game';

class Game extends Phaser.Game {

  constructor() {
    // set render size with max constraint
    const clientWidth = document.documentElement.clientWidth;
    const clientHeight = document.documentElement.clientHeight;
    const width = clientWidth > 1280 ? 1280 : clientWidth;
    const height = clientHeight > 1024 ? 1024 : clientHeight;
    // create configuration
    const config = {
      width,
      height,
      renderMode: Phaser.AUTO,
      transparent: false,
      antialias: false,
    };
    super(config);
    // add states
    this.state.add('Boot', BootState, false);
    this.state.add('Preload', PreloadState, false);
    this.state.add('Game', GameState, false);
    // start with Boot state
    this.state.start('Boot');
  }
}

module.exports = Game;
