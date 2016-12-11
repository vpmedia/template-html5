/* eslint-disable import/no-extraneous-dependencies, no-console */

import chai from 'chai';
import { stub } from 'sinon';
import sinonChai from 'sinon-chai';
import { describe, it } from 'mocha';
import Main from '../../main/common/main';

chai.should();
chai.use(sinonChai);

describe('common', () => {
  describe('Main', () => {
    describe('init', () => {
      it('print Main ES6', () => {
        stub(console, 'log');
        new Main('ES6').console();
        console.log.should.have.been.calledWith('Main ES6');
        console.log.restore();
      });
    });
  });
});
