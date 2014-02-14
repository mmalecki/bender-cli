var bender = require('../../');

exports.usage = [
  '`bender-cli registrations` manages registrations.',
  '',
  '  bender registrations list - list all registrations'
];

exports.list = function (callback) {
  bender.log.info('Listing registrations...');
  bender.api.getRegistrations(function (err, registrations) {
    if (err) {
      return bender.log.error(err.message);
    }

    var rows = [['app', 'host', 'port']];
    var colors = ['underline', 'underline', 'underline'];

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
