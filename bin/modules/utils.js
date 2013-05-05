var aAvailableCommands, aVBoxesUIDs, exec, getVBoxes, iCurrentIndex, oVBoxes, os, rClearQuotes, rVMName;

exec = require('child_process').exec;

os = require('os');

oVBoxes = {};

aVBoxesUIDs = [];

iCurrentIndex = 0;

aAvailableCommands = ['start', 'list'];

rVMName = /^".+"\s\{(.+)\}\s*$/;

rClearQuotes = /"/g;

getVBoxes = function(fCallback) {
  return exec('VBoxManage list vms', function(oError, sOut, sErr) {
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
    _results = [];
    for (_i = 0, _len = aVBoxesUIDs.length; _i < _len; _i++) {
      sCurrentVMID = aVBoxesUIDs[_i];
      _results.push(exec('VBoxManage showvminfo ' + sCurrentVMID + ' --machinereadable', function(oError, sOut, sErr) {
        var aCurrentInfo, oVMInfos, sCurrentInfo, _j, _len1, _ref, _ref1;
        oVMInfos = {};
        _ref = sOut.split(os.EOL);
        for (_j = 0, _len1 = _ref.length; _j < _len1; _j++) {
          sCurrentInfo = _ref[_j];
          aCurrentInfo = sCurrentInfo.split('=');
          oVMInfos[aCurrentInfo[0].replace(rClearQuotes, '')] = (_ref1 = aCurrentInfo[1]) != null ? _ref1.replace(rClearQuotes, '') : void 0;
        }
        oVMInfos.state = oVMInfos.VMState;
        oVBoxes[oVMInfos.UUID] = oVMInfos;
        iCurrentIndex--;
        if (iCurrentIndex === 0) {
          return fCallback(oVBoxes);
        }
      }));
    }
    return _results;
  });
};

exports.getVBoxes = getVBoxes;
