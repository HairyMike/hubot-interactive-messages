'use strict';
require('coffee-script/register');

const Helper = require('hubot-test-helper');

process.env.SLACK_VERIFICATION_TOKEN = 'iUeRJkkRC9RMMvSRTd8gdq2m';

const sctiptPath = '../src/interactive-messages.js';
const helper = new Helper(sctiptPath);
const payload = require('fs').readFileSync('test/payload.json', 'utf8');
const supertest = require('supertest');

describe('interactive messages', function() {
  beforeEach(function() {
    this.room = helper.createRoom({
      name: 'bob',
    });
  });

  afterEach(function() {
    this.room.destroy();
  });

  it('action handler', function (done) {
    this.room.robot.setActionHandler('select_simple_1234', () => done());
    this.room.robot.setActionHandler('something_else', () => done.fail());
    supertest(this.room.robot.router)
      .post('/slack/actions')
      .type('form')
      .send({ payload })
      .expect(200)
      .catch(done.fail);
  });
});
