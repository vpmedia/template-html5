// @flow

class Library {
  name: string;

  constructor(name: string) {
    this.name = name;
  }

  init() {
    return `${this.name}`;
  }

  console() {
    console.log(`${this.name}`);
  }
}

module.exports = Library;
