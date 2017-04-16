/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable import/no-unresolved */
/* eslint-disable import/extensions */
/* globals __DEV__ */
import Phaser from 'phaser';
import WebFont from 'webfontloader';

class BootState extends Phaser.State {
  init() {
    const GAME_WIDTH = 1280;
    const GAME_HEIGHT = 1024;
    this.stage.backgroundColor = '#000000';
    this.input.maxPointers = 1;
    this.game.renderer.renderSession.roundPixels = true;
    this.stage.disableVisibilityChange = true;
    this.scale.scaleMode = Phaser.ScaleManager.USER_SCALE;
    this.scale.fullScreenScaleMode = Phaser.ScaleManager.USER_SCALE;
    this.game.scale.onSizeChange.add((width, height) => {
      const state = this.game.state.getCurrentState();
      if (state && state.resize) {
        state.resize(width, height);
      }
    });
    let lastWidth = -1;
    let lastHeight = -1;
    this.game.scale.setResizeCallback((scale, parentBounds) => {
      if (lastWidth !== parentBounds.width || lastHeight !== parentBounds.height) {
        lastWidth = parentBounds.width;
        lastHeight = parentBounds.height;
        const userScale = Math.min(lastWidth / GAME_WIDTH, lastHeight / GAME_HEIGHT);
        const invertedUserScale = 1 / userScale;
        this.game.scale.setUserScale(userScale);
        const newGameWidth = Math.round(window.innerWidth * invertedUserScale);
        const newGameHeight = Math.round(window.innerHeight * invertedUserScale);
        this.game.scale.setGameSize(newGameWidth, newGameHeight);
      }
    }, this);
    this.game.forceSingleUpdate = true;
    this.game.time.advancedTiming = __DEV__;
    this.onFontsLoaded = this.onFontsLoaded.bind(this);
  }

  preload() {
    WebFont.load({
      google: {
        families: ['Ubuntu'],
      },
      active: this.onFontsLoaded,
    });
    this.view = {};
    this.view.textLabel = this.add.text(this.world.centerX, this.world.centerY, 'Initializing ...', {
      font: '16px Arial',
      fill: '#FFFFFF',
      align: 'center',
    });
    this.view.textLabel.anchor.setTo(0.5, 0.5);
    this.load.image('loaderBar', 'assets/loader-bar.png');
  }

  resize() {
    this.view.textLabel.x = this.world.centerX;
    this.view.textLabel.y = this.world.centerY;
  }

  onFontsLoaded() {
    this.state.start('Preload');
  }

}

module.exports = BootState;
