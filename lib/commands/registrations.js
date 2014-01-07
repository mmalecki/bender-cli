var bender = require('../../');
var getArgv = require('../utils/get-argv.js');

exports.usage = [
  '`bender-cli registrations` manages registrations.',
  '',
  '  bender registrations list - list all registrations'
];

exports.list = function (callback) {
  bender.log.info('Listing registrations...');
  bender.api.registrations.list(function (err, registrations) {
    console.dir(arguments);
    if (err) {
      return bender.log.error(err.message);
    }

    var rows = [['name', 'app', 'host', 'port']];
    var colors = ['underline', 'underline'];

    if (registrations.length === 0) {
      bender.log.info('No registrations found');
      return callback();
    }

    Array.prototype.push.apply(rows, registrations.map(function (registration) {
      return [
        registration.app + '@' + registration.version,
        registration.host, registration.port
      ];
    }));
    bender.inspect.putRows('data', rows, colors);
    callback();
  });
};
