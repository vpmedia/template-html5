/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable import/no-unresolved */
/* eslint-disable import/extensions */
/* globals __DEV__ */
// import 'pixi';
// import 'p2';
import Phaser from 'phaser';

import BootState from './phaser/boot';
import PreloadState from './phaser/preload';
import GameState from './phaser/game';

class Game extends Phaser.Game {

  constructor() {
    super({
      width: 1280,
      height: 1024,
      renderMode: Phaser.AUTO,
      transparent: false,
      antialias: false,
      enableDebug: __DEV__,  // enable phaser debug class
      disableVisibilityChange: true,  // do not pause the game when the browser tab loses focus
      backgroundColor: '#000000',  // stage background color
    });
    this.state.add('Boot', BootState, false);
    this.state.add('Preload', PreloadState, false);
    this.state.add('Game', GameState, false);
    this.state.start('Boot');
  }
}

module.exports = Game;
