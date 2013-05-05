exec = require( 'child_process' ).exec
os = require 'os'

oVBoxes = {}
aVBoxesUIDs = []
iCurrentIndex = 0
aAvailableCommands = [ 'start', 'list' ]
rVMName = /^".+"\s\{(.+)\}\s*$/
rClearQuotes = /"/g

getVBoxes = ( fCallback ) ->
    exec 'VBoxManage list vms', ( oError, sOut, sErr ) ->
        # TODO if oError
        aVBoxesUIDs = ( rVMName.exec( elt )?[1] for elt in sOut.split( os.EOL ) )
        aVBoxesUIDs = aVBoxesUIDs.filter ( elt ) ->
            elt
        iCurrentIndex = aVBoxesUIDs.length
        for sCurrentVMID in aVBoxesUIDs
            exec 'VBoxManage showvminfo ' + sCurrentVMID + ' --machinereadable', ( oError, sOut, sErr ) ->
                # TODO if oError : decrement index
                oVMInfos = {}
                for sCurrentInfo in sOut.split os.EOL
                    aCurrentInfo = sCurrentInfo.split '='
                    oVMInfos[ aCurrentInfo[ 0 ] ] = aCurrentInfo[ 1 ].replace rClearQuotes, ''
                oVMInfos.state = oVMInfos.VMState
                oVBoxes[ oVMInfos.UUID ] = oVMInfos
                iCurrentIndex--
                fCallback oVBoxes if iCurrentIndex is 0
