var bender = require('../../');

module.exports = function () {
  var ret = {};
  Object.keys(bender.argv).forEach(function (key) {
    if (key !== '_' && key !== '$0') {
      ret[key] = bender.argv[key];
    }
  });
  return ret;
};
