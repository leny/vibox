clc = require 'cli-color'
os = require 'os'

showInfos = ( oVMInfo, bFull ) ->
    aLogLine = []
    sSeparator = ( aHR = ( '=' for num in [0...oVMInfo.name.length+4] ) ).join ''
    aLogLine.push clc.yellow sSeparator
    aLogLine.push clc.yellow '= ' + oVMInfo.name + ' ='
    aLogLine.push clc.yellow sSeparator
    aLogLine.push clc.yellow( '- uuid: ' ) + clc.cyan '{' + oVMInfo.UUID + '}'
    aLogLine.push clc.yellow( '- group: ' ) + oVMInfo.groups
    aLogLine.push clc.yellow( '- os: ' ) + oVMInfo.ostype
    aLogLine.push clc.yellow( '- ram: ' ) + oVMInfo.memory + 'MB'
    aLogLine.push clc.yellow( '+ state: ' ) + if oVMInfo.state is 'running' then clc.green( oVMInfo.state ) else clc.red( oVMInfo.state )
    aLogLine.push clc.yellow( '  - since: ' ) + ( oDate = new Date( oVMInfo.VMStateChangeTime ) ).toLocaleDateString() + ' ' + oDate.toLocaleTimeString()
    if oVMInfo.SharedFolders.length
        aLogLine.push clc.yellow( '+ shared folders: ' )
        for oSharedFolder in oVMInfo.SharedFolders
            aLogLine.push clc.yellow( '  - ' + oSharedFolder.name + ': ' ) + clc.magenta.bold( oSharedFolder.path )
    if bFull
        aLogLine.push clc.yellow( '+ full informations: ' )
        for sProperty, mValue of oVMInfo
            aLogLine.push clc.yellow( '  - ' + sProperty + ': ' ) + mValue
    console.log aLogLine.join os.EOL

exports.exec = ( vm, program ) ->
    require( './utils' ).getVBoxes ( oResponse ) ->
        sVMSearchClause = vm.trim()
        for sUID, oVM of oResponse
            if sUID is sVMSearchClause or oVM.name is sVMSearchClause
                return showInfos oVM, program.full
        console.log clc.red.bold 'Unknown VM "' + sVMSearchClause + '"'
