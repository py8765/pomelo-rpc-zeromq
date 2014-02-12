// remote service

module.exports = function(context) {
  return {
    echo: function(msg, cb) {
      // cb(null, 'echo: ' + msg);
      cb(null, 200);
    }
  };
};
