// Description
//   A hubot wrapper for @slack/interactive-messages.
//
// Configuration:
//   SLACK_SIGNING_SECRET, SLACK_ACTIONS_URL, SLACK_OPTIONS_URL
// Commands
//
// Notes:
//
// Author:
//   Farid Nouri Neshat <FaridN_SOAD@Yahoo.com>

'use strict';

const { createMessageAdapter } = require('@slack/interactive-messages');

module.exports = function (robot) {
  if (robot.setActionHandler || robot.setOptionsHandler) {
    throw new Error(`robot.setActionHandler and robot.setOptionsHandler are already defined.
This module will not redefine them. Something is conflicting with this module.`);
  }

  const slackInteractions = createMessageAdapter(process.env.SLACK_SIGNING_SECRET);

  robot.setActionHandler = slackInteractions.action.bind(slackInteractions);
  robot.setOptionsHandler = slackInteractions.options.bind(slackInteractions);

  const messageMiddleware = slackInteractions.expressMiddleware();

  robot.router.use(process.env.SLACK_ACTIONS_URL || '/slack/actions', messageMiddleware);
  robot.router.use(process.env.SLACK_OPTIONS_URL || '/slack/options', messageMiddleware);
  robot.emit('interactivity-loaded');
};
