var bender = require('../../');
var getArgv = require('../utils/get-argv.js');

exports.usage = [
  '`bender-cli backends` manages backends.',
  '',
  '  bender backends list - list all backends',
  '  bender backends create <name> <app>@<version>',
  '  bender backends switch <name> <new-version>'
];

exports.list = function (callback) {
  bender.log.info('Listing backends...');
  bender.api.getBackends(function (err, backends) {
    if (err) {
      return callback(err);
    }

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
  var backend;

  if (typeof name !== 'string' || typeof app !== 'string') {
    return callback(new Error('Backend name and app specifier are required'));
  }

  app = app.split('@');
  if (app.length !== 2) {
    return callback(new Error('Invalid app specifier, need <app>@<version>'));
  }

  bender.log.info('Creating backend');

  backend = {
    name: name,
    app: app[0],
    version: app[1]
  };

  Object.keys(getArgv()).forEach(function (key) {
    backend[key] = bender.argv[key];
  });

  bender.inspect.putObject(backend);

  bender.api.createBackend(backend, function (err) {
    if (err) {
      bender.log.error(err.message);
    }
    else {
      bender.log.info('Backend ' + name.magenta + ' created');
    }

    callback();
  });
};

exports.switch = function (name, newVersion, callback) {
  if (typeof name !== 'string' || typeof newVersion !== 'string') {
    return callback(new Error('Backend name and new version are required'));
  }

  bender.api.getBackend(name, function (err, backend) {
    if (err) {
      return callback(err);
    }

    if (backend.version === newVersion) {
      bender.log.info('Already set to that version');
      return callback();
    }
  });
};
