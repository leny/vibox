var clc, exec, os;

exec = require('child_process').exec;

clc = require('cli-color');

os = require('os');

exports.start = function(vm, program) {
  return require('./utils').getVBoxes(function(oResponse) {
    var oVM, sCommand, sUID, sVMSearchClause;
    sVMSearchClause = vm.trim();
    for (sUID in oResponse) {
      oVM = oResponse[sUID];
      if (sUID === sVMSearchClause || oVM.name === sVMSearchClause) {
        if (oVM.state === 'running' || oVM.state === 'paused') {
          return console.log(clc.yellow('VM "' + oVM.name + '" is already running !'));
        }
        sCommand = 'VBoxManage startvm ' + sUID + (program.headless ? ' --type headless' : '');
        console.log(clc.yellow('VM "' + oVM.name + '" starting...'));
        return exec(sCommand, function(oError, sOut, sErr) {
          if (!oError) {
            return console.log(clc.green('started.'));
          }
        });
      }
    }
    return console.log(clc.red.bold('Unknown VM "' + sVMSearchClause + '"'));
  });
};
