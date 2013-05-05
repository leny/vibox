var os;

os = require('os');

exports.commands = function() {
  console.log('list');
  console.log('show');
  console.log('start');
  return console.log('control');
};

exports.vms = function(sCommand) {
  return require('./utils').getVBoxes(function(oResponse) {
    var oVMInfo, sUID, _results;
    _results = [];
    for (sUID in oResponse) {
      oVMInfo = oResponse[sUID];
      _results.push(console.log(oVMInfo.escaped_name + os.EOL));
    }
    return _results;
  });
};
