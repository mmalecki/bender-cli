var path = require('path');
var flatiron = require('flatiron');
var benderAPI = require('bender-api');

var bender = module.exports = flatiron.app;
bender.use(flatiron.plugins.cli, {
  version: true,
  source: path.join(__dirname, 'commands'),
  usage: [
    'Welcome to bender-cli!',
    '',
    'Available commands:',
    '  bender-cli backends'
  ]
});
bender.use(require('flatiron-cli-config'));

bender.api = benderAPI(bender.config.get('bender'));

bender.start();
