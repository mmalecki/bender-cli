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
    '',
    'Backends',
    '',
    '  bender-cli backends list',
    '  bender-cli backends create <name> <app>@<version>',
    '',
    'Frontends',
    '',
    '  bender-cli frontends list',
    '  bender-cli frontends create <name> <backend>',
    '',
    'Registrations',
    '',
    '  bender-cli registrations list'
  ]
});

bender.config
  .env()
  .file(bender.argv.config || bender.argv.c || path.join(process.env.HOME, '.benderconf'));

bender.use(require('flatiron-cli-config'));

bender.api = benderAPI(bender.config.get('bender'));
