var bender = require('../../');
var getArgv = require('../utils/get-argv.js');

exports.usage = [
  '`bender-cli frontends` manages frontends.',
  '',
  '  bender frontends list - list all frontends',
  '  bender frontends create <name> <backend> - create a frontend'
];

exports.list = function (callback) {
  bender.log.info('Listing frontends...');
  bender.api.frontends.list(function (err, frontends) {
    var rows = [['name', 'backend']];
    var colors = ['underline', 'underline'];

    if (frontends.length === 0) {
      bender.log.info('No frontends found');
      return callback();
    }

    Array.prototype.push.apply(rows, frontends.map(function (frontend) {
      return [ frontend.name, frontend.backend ];
    }));
    bender.inspect.putRows('data', rows, colors);
    callback();
  });
};

exports.create = function (name, backend, callback) {
  var frontend;

  if (typeof name !== 'string' || typeof backend !== 'string') {
    bender.log.error('Frontend and backend name are required');
    return callback();
  }

  bender.log.info('Creating frontend');

  frontend = {
    name: name,
    backend: backend
  };

  Object.keys(getArgv()).forEach(function (key) {
    frontend[key] = bender.argv[key];
  });

  bender.inspect.putObject(frontend);

  bender.api.frontends.create(frontend, function (err) {
    if (err) {
      bender.log.error(err.message);
    }
    else {
      bender.log.info('Frontend ' + name.magenta + ' created');
    }

    callback();
  });
};
