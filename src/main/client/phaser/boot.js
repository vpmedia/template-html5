/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable import/no-unresolved */
/* eslint-disable import/extensions */
/* globals __DEV__ */
import Phaser from 'phaser';
import WebFont from 'webfontloader';

class BootState extends Phaser.Scene {
  init() {
    this.input.maxPointers = 1;
    this.onFontsLoaded = this.onFontsLoaded.bind(this);
  }

  preload() {
    WebFont.load({
      google: {
        families: ['Ubuntu'],
      },
      active: this.onFontsLoaded,
    });
    console.log(this);
    this.view = {};
    this.view.textLabel = this.add.text(50, 50, 'Initializing ...', {
      font: '16px Arial',
      fill: '#FFFFFF',
      align: 'center',
    });
    console.log(this.view.textLabel);
    // this.view.textLabel.anchor.setTo(0.5, 0.5);
    this.load.image('loaderBar', 'assets/loader-bar.png');
  }

  resize() {
    this.view.textLabel.x = this.world.centerX;
    this.view.textLabel.y = this.world.centerY;
  }

  onFontsLoaded() {
    this.scene.start('Preload');
  }

}

module.exports = BootState;
