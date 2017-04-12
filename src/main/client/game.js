/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable import/no-unresolved */
/* eslint-disable import/extensions */
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
    });
    this.state.add('Boot', BootState, false);
    this.state.add('Preload', PreloadState, false);
    this.state.add('Game', GameState, false);
    this.state.start('Boot');
  }
}

module.exports = Game;
