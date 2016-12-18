/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable import/no-unresolved */
/* eslint-disable import/extensions */
/* globals __DEV__ */
import Phaser from 'phaser';

class GameState extends Phaser.State {

  create() {
    this.textTitle = this.add.text(this.game.world.centerX, this.game.world.centerY, 'GAME SCREEN');
    this.textTitle.font = 'Ubuntu';
    this.textTitle.fontSize = 32;
    this.textTitle.fill = '#FFFFFF';
    this.textTitle.anchor.setTo(0.5);
  }

  render() {
    if (this.game.time.advancedTiming) {
      this.game.debug.text(`${this.game.time.fps} fps this.name`, 5, 50, '#FFFFFF', '12px Courier');
      // this.game.debug.spriteInfo(this._textTitle, 32, 32);
    }
  }
}

module.exports = GameState;
