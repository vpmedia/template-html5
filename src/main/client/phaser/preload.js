/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable import/no-unresolved */
/* eslint-disable import/extensions */
import Phaser from 'phaser';

class PreloadState extends Phaser.Scene {

  preload() {
    this.view = {};
    this.view.preloadProgress = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'loaderBar');
    this.view.preloadProgress.anchor.set(0.5);
    this.load.setPreloadSprite(this.view.preloadProgress);
    // TODO: load your assets
    // this.load.image('custom_id', 'assets/custom.png');
  }

  create() {
    this.scene.start('Game');
  }

  resize() {
    this.view.preloadProgress.x = this.game.world.centerX;
    this.view.preloadProgress.y = this.game.world.centerY;
  }

}

module.exports = PreloadState;
