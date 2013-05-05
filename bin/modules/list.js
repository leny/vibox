"use strict";

var clc, showVM;

clc = require('cli-color');

showVM = function(oVMInfo, bShowState) {
  var aLogLine;
  aLogLine = [];
  aLogLine.push(clc.yellow(oVMInfo.name));
  aLogLine.push(clc.cyan('{' + oVMInfo.UUID + '}'));
  if (bShowState) {
    aLogLine.push(oVMInfo.state === 'running' ? clc.green(oVMInfo.state) : clc.red(oVMInfo.state));
  }
  return console.log(aLogLine.join(' '));
};

exports.exec = function(program) {
  return require('./utils').getVBoxes(function(oResponse) {
    var oVMInfo, sUID, _results;
    _results = [];
    for (sUID in oResponse) {
      oVMInfo = oResponse[sUID];
      if (program.running) {
        if (oVMInfo.state === 'running') {
          _results.push(showVM(oVMInfo, program.state));
        } else {
          _results.push(void 0);
        }
      } else {
        _results.push(showVM(oVMInfo, program.state));
      }
    }
    return _results;
  });
};
