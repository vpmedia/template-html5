/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable import/no-unresolved */
/* eslint-disable import/extensions */

import Phaser from 'phaser';

class PreloadState extends Phaser.State {

  preload() {
    const preloadBackground = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'loaderBg');
    preloadBackground.anchor.set(0.5);
    const preloadProgress = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'loaderBar');
    preloadProgress.anchor.set(0.5);
    // set preloader bar sprite
    this.load.setPreloadSprite(preloadProgress);
    // TODO: load your assets
    // this.load.image('custom_id', 'assets/images/custom.png');
  }

  create() {
    this.state.start('Game');
  }

}

module.exports = PreloadState;
