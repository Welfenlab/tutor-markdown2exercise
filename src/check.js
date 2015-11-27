var msg = function (level, msg) {
  return { level: level, message: msg };
};
var info = msg.bind(undefined, 'info');
var warn = msg.bind(undefined, 'warning');
var err  = msg.bind(undefined, 'error');

module.exports = function(markdown) {
  return [
    info('No checks implemented yet.')
  ];
};
