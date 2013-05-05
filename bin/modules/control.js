var clc, controlVM, exec, os, startVM;

exec = require('child_process').exec;

clc = require('cli-color');

os = require('os');

startVM = function(oVM, bHeadless) {
  var sCommand;
  if (oVM.state === 'running' || oVM.state === 'paused') {
    return console.log(clc.yellow('VM "' + oVM.name + '" is already running !'));
  }
  sCommand = 'VBoxManage startvm ' + oVM.UUID + (bHeadless ? ' --type headless' : '');
  console.log(clc.yellow('VM "' + oVM.name + '" starting...'));
  return exec(sCommand, function(oError, sOut, sErr) {
    if (!oError) {
      return console.log(clc.green('started.'));
    }
  });
};

controlVM = function(oVM, sAction) {
  return exec('VBoxManage controlvm ' + oVM.UUID + ' ' + sAction, function(oError, sOut, sErr) {
    if (!oError) {
      return console.log(sOut);
    }
  });
};

exports.start = function(vm, program) {
  return require('./utils').getVBoxes(function(oResponse) {
    var oVM, sUID, sVMSearchClause;
    sVMSearchClause = vm.trim();
    for (sUID in oResponse) {
      oVM = oResponse[sUID];
      if (sUID === sVMSearchClause || oVM.name === sVMSearchClause) {
        return startVM(oVM, program.headless);
      }
    }
    return console.log(clc.red.bold('Unknown VM "' + sVMSearchClause + '"'));
  });
};

exports.control = function(vm, action, program) {
  return require('./utils').getVBoxes(function(oResponse) {
    var oVM, sUID, sVMSearchClause;
    sVMSearchClause = vm.trim();
    for (sUID in oResponse) {
      oVM = oResponse[sUID];
      if (sUID === sVMSearchClause || oVM.name === sVMSearchClause) {
        switch (action) {
          case 'start':
            return startVM(oVM, false);
          case 'headless':
            return startVM(oVM, true);
          case 'stop':
            return controlVM(oVM, 'acpipowerbutton');
          case 'pause':
          case 'resume':
          case 'reset':
          case 'poweroff':
            return controlVM(oVM, action);
          default:
            return console.log(clc.red.bold('Unknow action "' + action + '"'));
        }
      }
    }
    return console.log(clc.red.bold('Unknown VM "' + sVMSearchClause + '"'));
  });
};