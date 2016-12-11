import 'babel-polyfill';
import Main from '../common/main';

const main = new Main('ES6');

document.querySelector('.app').innerText = main.init();
