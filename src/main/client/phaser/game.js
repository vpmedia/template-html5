/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable import/no-unresolved */
/* eslint-disable import/extensions */
import Phaser from 'phaser';

class GameState extends Phaser.Scene {

  create() {
    this.view = {};
    this.view.textTitle = this.add.text(this.game.world.centerX, this.game.world.centerY, 'GAME SCREEN');
    this.view.textTitle.font = 'Ubuntu';
    this.view.textTitle.fontSize = 32;
    this.view.textTitle.fill = '#FFFFFF';
    this.view.textTitle.anchor.setTo(0.5);
  }

  resize() {
    this.view.textTitle.x = this.game.world.centerX;
    this.view.textTitle.y = this.game.world.centerY;
  }

  render() {
    if (this.game.time.advancedTiming) {
      this.game.debug.text(`${this.game.time.fps} fps this.name`, 5, 50, '#FFFFFF', '12px Courier');
      // this.game.debug.spriteInfo(this.view.textTitle, 32, 32);
    }
  }
}

module.exports = GameState;
