exec = require( 'child_process' ).exec
os = require 'os'

oVBoxes = {}
aVBoxesUIDs = []
iCurrentIndex = 0
aAvailableCommands = [ 'start', 'list' ]
rVMName = /^".+"\s\{(.+)\}\s*$/
rClearQuotes = /"/g
rSharedFolder = /^SharedFolder(Name|Path)MachineMapping(\d+)$/i

getVBoxes = ( fCallback ) ->
    exec 'VBoxManage list vms', ( oError, sOut, sErr ) ->
        # TODO if oError
        aVBoxesUIDs = ( rVMName.exec( elt )?[ 1 ] for elt in sOut.split( os.EOL ) )
        aVBoxesUIDs = aVBoxesUIDs.filter ( elt ) ->
            elt
        iCurrentIndex = aVBoxesUIDs.length
        for sCurrentVMID in aVBoxesUIDs
            exec 'VBoxManage showvminfo ' + sCurrentVMID + ' --machinereadable', ( oError, sOut, sErr ) ->
                # TODO if oError : decrement index
                oVMInfos = {}
                aSharedFolders = []
                for sCurrentInfo in sOut.split os.EOL
                    aCurrentInfo = sCurrentInfo.split '='
                    sCurrentProperty = aCurrentInfo[ 0 ].replace rClearQuotes, ''
                    if( rSharedFolder.test sCurrentProperty )
                        aSharedFolderInfos = rSharedFolder.exec sCurrentProperty
                        iSharedFolderIndex = parseFloat( aSharedFolderInfos[ 2 ] ) - 1
                        aSharedFolders[ iSharedFolderIndex ] = {} if !aSharedFolders[ iSharedFolderIndex ]
                        aSharedFolders[ iSharedFolderIndex ][ aSharedFolderInfos[ 1 ].trim().toLowerCase() ] = aCurrentInfo[ 1 ]?.replace rClearQuotes, ''
                    else
                        oVMInfos[ sCurrentProperty ] = aCurrentInfo[ 1 ]?.replace rClearQuotes, ''
                oVMInfos.state = oVMInfos.VMState
                oVMInfos.SharedFolders = aSharedFolders
                oVBoxes[ oVMInfos.UUID ] = oVMInfos
                iCurrentIndex--
                fCallback oVBoxes if iCurrentIndex is 0

exports.getVBoxes = getVBoxes
