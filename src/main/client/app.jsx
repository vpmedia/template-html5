import 'babel-polyfill';

import React, { PropTypes } from 'react';
import ReactDOM from 'react-dom';
import Main from '../common/main';

const main = new Main('ES6');

const App = props => (
  <div>
    {props.message}
  </div>
);

App.propTypes = {
  message: PropTypes.string.isRequired,
};

const appMessage = main.init();
ReactDOM.render(<App message={appMessage} />, document.querySelector('.app'));

