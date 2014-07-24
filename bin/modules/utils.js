"use strict";
var aAvailableCommands, aVBoxesUIDs, exec, fCallback, getVBoxes, iCurrentIndex, oVBoxes, os, parseVBoxInfos, rClearQuotes, rClearSpaces, rSharedFolder, rVMName;

exec = require('child_process').exec;

os = require('os');

oVBoxes = {};

aVBoxesUIDs = [];

iCurrentIndex = 0;

fCallback = null;

aAvailableCommands = ['start', 'list'];

rVMName = /^".+"\s\{(.+)\}\s*$/;

rClearQuotes = /"/g;

rClearSpaces = /\s/g;

rSharedFolder = /^SharedFolder(Name|Path)MachineMapping(\d+)$/i;

parseVBoxInfos = function(oError, sOut) {
  var aCurrentInfo, aSharedFolderInfos, aSharedFolders, iSharedFolderIndex, oVMInfos, sCurrentInfo, sCurrentProperty, _i, _len, _ref, _ref1, _ref2;
  oVMInfos = {};
  aSharedFolders = [];
  _ref = sOut.split(os.EOL);
  for (_i = 0, _len = _ref.length; _i < _len; _i++) {
    sCurrentInfo = _ref[_i];
    aCurrentInfo = sCurrentInfo.split('=');
    sCurrentProperty = aCurrentInfo[0].replace(rClearQuotes, '');
    if (rSharedFolder.test(sCurrentProperty)) {
      aSharedFolderInfos = rSharedFolder.exec(sCurrentProperty);
      iSharedFolderIndex = parseFloat(aSharedFolderInfos[2]) - 1;
      if (!aSharedFolders[iSharedFolderIndex]) {
        aSharedFolders[iSharedFolderIndex] = {};
      }
      aSharedFolders[iSharedFolderIndex][aSharedFolderInfos[1].trim().toLowerCase()] = (_ref1 = aCurrentInfo[1]) != null ? _ref1.replace(rClearQuotes, '') : void 0;
    } else {
      oVMInfos[sCurrentProperty] = (_ref2 = aCurrentInfo[1]) != null ? _ref2.replace(rClearQuotes, '') : void 0;
    }
  }
  oVMInfos.escaped_name = oVMInfos.name.replace(rClearSpaces, '_');
  oVMInfos.state = oVMInfos.VMState;
  oVMInfos.SharedFolders = aSharedFolders;
  oVBoxes[oVMInfos.UUID] = oVMInfos;
  iCurrentIndex--;
  if (iCurrentIndex === 0) {
    return fCallback(oVBoxes);
  }
};

getVBoxes = function(fEndCallback) {
  return exec('VBoxManage list vms', function(oError, sOut) {
    var elt, sCurrentVMID, _i, _len, _results;
    aVBoxesUIDs = (function() {
      var _i, _len, _ref, _ref1, _results;
      _ref = sOut.split(os.EOL);
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        elt = _ref[_i];
        _results.push((_ref1 = rVMName.exec(elt)) != null ? _ref1[1] : void 0);
      }
      return _results;
    })();
    aVBoxesUIDs = aVBoxesUIDs.filter(function(elt) {
      return elt;
    });
    iCurrentIndex = aVBoxesUIDs.length;
    fCallback = fEndCallback;
    _results = [];
    for (_i = 0, _len = aVBoxesUIDs.length; _i < _len; _i++) {
      sCurrentVMID = aVBoxesUIDs[_i];
      _results.push(exec('VBoxManage showvminfo ' + sCurrentVMID + ' --machinereadable', parseVBoxInfos));
    }
    return _results;
  });
};

exports.getVBoxes = getVBoxes;
