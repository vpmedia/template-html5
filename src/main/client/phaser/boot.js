/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable import/no-unresolved */
/* eslint-disable import/extensions */
import Phaser from 'phaser';
import WebFont from 'webfontloader';

class BootState extends Phaser.State {
  init() {
    // set background color
    this.stage.backgroundColor = '#000000';
    // sets the number of pointers – the cursor or the touch
    this.input.maxPointers = 1;
    // round coordinates to whole pixels
    this.game.renderer.renderSession.roundPixels = true;
    // do not pause the game when the browser tab loses focus
    this.stage.disableVisibilityChange = true;
    // set scale mode to show all centered
    this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    this.scale.fullScreenScaleMode = Phaser.ScaleManager.SHOW_ALL;
    this.scale.pageAlignHorizontally = true;
    this.scale.pageAlignVertically = true;
    // performance optimization
    this.game.forceSingleUpdate = true;
    // use fps counter with advanced timing mode
    this.game.time.advancedTiming = __DEV__;
    // add custom webfont loader handler
    this.onFontsLoaded = this.onFontsLoaded.bind(this);
  }

  preload() {
    WebFont.load({
      google: {
        families: ['Ubuntu'],
      },
      active: this.onFontsLoaded,
    });

    const text = this.add.text(this.world.centerX, this.world.centerY, 'Initializing ...', {
      font: '16px Arial',
      fill: '#FFFFFF',
      align: 'center',
    });
    text.anchor.setTo(0.5, 0.5);

    this.load.image('loaderBg', './assets/images/loader-bg.png');
    this.load.image('loaderBar', './assets/images/loader-bar.png');
  }

  onFontsLoaded() {
    this.state.start('Preload');
  }

}

module.exports = BootState;
