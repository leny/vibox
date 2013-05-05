var clc, os, showInfos;

clc = require('cli-color');

os = require('os');

showInfos = function(oVMInfo, bFull) {
  var aHR, aLogLine, mValue, num, oDate, oSharedFolder, sProperty, sSeparator, _i, _len, _ref;
  aLogLine = [];
  sSeparator = (aHR = (function() {
    var _i, _ref, _results;
    _results = [];
    for (num = _i = 0, _ref = oVMInfo.name.length + 4; 0 <= _ref ? _i < _ref : _i > _ref; num = 0 <= _ref ? ++_i : --_i) {
      _results.push('=');
    }
    return _results;
  })()).join('');
  aLogLine.push(clc.yellow(sSeparator));
  aLogLine.push(clc.yellow('= ' + oVMInfo.name + ' ='));
  aLogLine.push(clc.yellow(sSeparator));
  aLogLine.push(clc.yellow('- uuid: ') + clc.cyan('{' + oVMInfo.UUID + '}'));
  aLogLine.push(clc.yellow('- group: ') + oVMInfo.groups);
  aLogLine.push(clc.yellow('- os: ') + oVMInfo.ostype);
  aLogLine.push(clc.yellow('- ram: ') + oVMInfo.memory + 'MB');
  aLogLine.push(clc.yellow('+ state: ') + (oVMInfo.state === 'running' ? clc.green(oVMInfo.state) : clc.red(oVMInfo.state)));
  aLogLine.push(clc.yellow('  - since: ') + (oDate = new Date(oVMInfo.VMStateChangeTime)).toLocaleDateString() + ' ' + oDate.toLocaleTimeString());
  if (oVMInfo.SharedFolders.length) {
    aLogLine.push(clc.yellow('+ shared folders: '));
    _ref = oVMInfo.SharedFolders;
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      oSharedFolder = _ref[_i];
      aLogLine.push(clc.yellow('  - ' + oSharedFolder.name + ': ') + clc.magenta.bold(oSharedFolder.path));
    }
  }
  if (bFull) {
    aLogLine.push(clc.yellow('+ full informations: '));
    for (sProperty in oVMInfo) {
      mValue = oVMInfo[sProperty];
      aLogLine.push(clc.yellow('  - ' + sProperty + ': ') + mValue);
    }
  }
  return console.log(aLogLine.join(os.EOL));
};

exports.exec = function(vm, program) {
  return require('./utils').getVBoxes(function(oResponse) {
    var oVM, sUID, sVMSearchClause;
    sVMSearchClause = vm.trim();
    for (sUID in oResponse) {
      oVM = oResponse[sUID];
      if (sUID === sVMSearchClause || oVM.name === sVMSearchClause) {
        return showInfos(oVM, program.full);
      }
    }
    return console.log(clc.red.bold('Unknown VM "' + sVMSearchClause + '"'));
  });
};
