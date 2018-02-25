/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable import/no-unresolved */
/* eslint-disable import/extensions */
import Phaser from 'phaser';

class PreloadState extends Phaser.Scene {

  preload() {
    this.view = {};
    this.view.preloadProgress = this.add.sprite(50, 50, 'loaderBar');
    // this.view.preloadProgress.anchor.set(0.5);
    this.load.setPreloadSprite(this.view.preloadProgress);
    // TODO: load your assets
    // this.load.image('custom_id', 'assets/custom.png');
  }

  create() {
    this.scene.start('Game');
  }

  resize() {
    this.view.preloadProgress.x = 50;
    this.view.preloadProgress.y = 50;
  }

}

module.exports = PreloadState;
