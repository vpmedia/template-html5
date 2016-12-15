/* globals __DEV__ */
import Phaser from 'phaser'

class GameState extends Phaser.State {

  create() {
    this._textTitle = this.add.text(this.game.world.centerX, this.game.world.centerY, 'GAME SCREEN');
    this._textTitle.font = 'Ubuntu';
    this._textTitle.fontSize = 32;
    this._textTitle.fill = '#FFFFFF';
    this._textTitle.anchor.setTo(0.5);
  }

  render() {
    if (this.game.time.advancedTiming) {
      this.game.debug.text(this.game.time.fps + ' fps', 5, 50, '#FFFFFF', '12px Courier');
      //this.game.debug.spriteInfo(this._textTitle, 32, 32);
    }
  }
}

module.exports = GameState;
