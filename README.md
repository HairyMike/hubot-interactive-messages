# hubot-interactive-messages

A hubot wrapper for [@slack/interactive-messages](https://github.com/slackapi/node-slack-interactive-messages).
This module adds `robot.setActionHandler` and `robot.setOptionsHandler` to your robot and also by default adds
listeners for `/slack/actions` and `/slack/options` HTTP routes. Optionally can configure these via `SLACK_ACTIONS_URL`
and  `SLACK_OPTIONS_URL`. This module does not add any hubot commands and is meant to be used by other scripts that use
slack interactive messages.

## Installation

### For Hubot Projects

In hubot project repo, run:

`npm install hubot-interactive-messages --save`

Then add **hubot-interactive-messages** to your `external-scripts.json`:

```json
[
  "hubot-interactive-messages"
]
```

### For Hubot scripts

Add this module as a peer dependency and in your README mention that this needs to be added to the main project.

## Configuration

You will need to set `SLACK_SIGNING_SECRET` env variable and also set the `/slack/actions` and `/slack/options`
 in the slack settings. You can find more info about that in
 [here](https://github.com/slackapi/node-slack-interactive-messages#configuration)

## How to use

Given this module is properly install you can use `robot.setActionHandler` and `robot.setOptionsHandler` functions.
These are the `slackMessages.action` and `slackMessages.options`
from [@slack/interactive-messages](https://github.com/slackapi/node-slack-interactive-messages).


```coffee
# path/to/myhubot/scripts/myscript.coffee
module.exports = (robot) ->
  robot.on 'interactivity-loaded', ->
    robot.setActionHandler /my_callback_id_.+/, (payload, respond) ->
      console.log payload
```

## Purpose and Future

I created this module because I wanted to use Slack interactive messages in my
hubot script, but if a project uses 2 or more scripts that both use
Slack interactive messages, then there will be a problem of how do they
both use set up a single HTTP handler without interfering with each other.

This module basically tries to solve that problem using the official [@slack/interactive-messages](https://github.com/slackapi/node-slack-interactive-messages)
module.

I would like this module to be more than a dumb wrapper that it is
right now. Ideally this module should help hubot scripts send cross-platform
interactive messages. This module should support other platforms that
have interactive messages or buttons and have text based(with urls)
fallbacks for other platforms.

I don't see any hubot scripts that uses interactive messages, and I'm
hoping there will be more at least by using this module.

## License

MIT License

Copyright (c) 2017 Olindata BV

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
"Software"), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
