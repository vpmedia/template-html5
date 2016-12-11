// @flow

class Main {
  name: string;

  constructor(name: string) {
    this.name = name;
  }

  init() {
    return `Main ${this.name}`;
  }

  console() {
    console.log(`Main ${this.name}`);
  }
}

module.exports = Main;
