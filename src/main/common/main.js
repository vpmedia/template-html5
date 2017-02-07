/* @flow */

class Main {

  /**
   * Constructor
   * @param {string} name - Name
   * @property {string} name - Name
   * @constructor
   */
  constructor(name) {
    this.name = name;
  }

  /**
   * @private
   */
  init() {
    return `${this.name}`;
  }

  /**
   * @private
   */
  console() {
    console.log(`${this.name}`);
  }
}

module.exports = Main;
