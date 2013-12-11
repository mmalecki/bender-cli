var bender = require('../../');

exports.usage = [
  '`bender-cli backends` manages backends.',
  '',
  '  bender backends list - list all backends',
  '  bender backends create <name> <app>@<version>'
];

exports.list = function (callback) {
  bender.log.info('Listing backends...');
  bender.api.backends.list(function (err, backends) {
    var rows = [['name', 'app']];
    var colors = ['underline', 'underline'];

    if (backends.length === 0) {
      bender.log.info('No backends found');
      return callback();
    }

    Array.prototype.push.apply(rows, backends.map(function (backend) {
      return [ backend.name, backend.app + '@' + backend.version ];
    }));
    bender.inspect.putRows('data', rows, colors);
    callback();
  });
};

exports.create = function (name, app, callback) {
  if (typeof name !== 'string' || typeof app !== 'string') {
    bender.log.error('Backend name and app specifier are required');
    return callback();
  }

  app = app.split('@');
  if (app.length !== 2) {
    console.log('Invalid app specifier, need <app>@<version>');
    return callback();
  }

  bender.log.info('Creating backend');
  bender.api.backends.create({
    name: name,
    app: app[0],
    version: app[1]
  }, function (err) {
    if (err) {
      bender.log.error(err.message);
    }
    else {
      bender.log.info('Backend ' + name.magenta + ' created');
    }

    callback();
  });
};
