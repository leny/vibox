"use strict";

var clc, controlVM, exec, os, parseCommand, startVM;

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
  return exec(sCommand, function(oError) {
    if (!oError) {
      return console.log(clc.green('started.'));
    }
  });
};

controlVM = function(oVM, sAction) {
  return exec('VBoxManage controlvm ' + oVM.UUID + ' ' + sAction, function(oError, sOut) {
    if (!oError) {
      return console.log(sOut);
    }
  });
};

parseCommand = function(sVMIdentifier, sAction) {
  return require('./utils').getVBoxes(function(oResponse) {
    var oVM, sUID;
    sVMIdentifier = sVMIdentifier.trim();
    for (sUID in oResponse) {
      oVM = oResponse[sUID];
      if (sUID === sVMIdentifier || oVM.name === sVMIdentifier || oVM.escaped_name === sVMIdentifier) {
        switch (sAction) {
          case 'start':
            return startVM(oVM, false);
          case 'headless':
            return startVM(oVM, true);
          case 'stop':
            return (oVM.acpi === 'on' ? controlVM(oVM, 'acpipowerbutton') : console.log(clc.red.bold('VM "' + oVM.name + '" doesn\'t have ACPI support enabled !')));
          case 'pause':
          case 'resume':
          case 'reset':
          case 'poweroff':
            return controlVM(oVM, sAction);
          default:
            return console.log(clc.red.bold('Unknow action "' + sAction + '"'));
        }
      }
    }
    return console.log(clc.red.bold('Unknown VM "' + sVMIdentifier + '"'));
  });
};

exports.start = function(vm, program) {
  return parseCommand(vm, (program.headless ? 'headless' : 'start'));
};

exports.headless = function(vm, program) {
  return parseCommand(vm, 'headless');
};

exports.stop = function(vm) {
  return parseCommand(vm, 'stop');
};

exports.control = function(vm, action) {
  return parseCommand(vm, action);
};
