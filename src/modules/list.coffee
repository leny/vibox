clc = require 'cli-color'

showVM = ( oVMInfo, bShowState ) ->
    aLogLine = []
    aLogLine.push clc.yellow oVMInfo.name
    aLogLine.push clc.cyan '{' + oVMInfo.UUID + '}'
    aLogLine.push( if oVMInfo.state is 'running' then clc.green( oVMInfo.state ) else clc.red( oVMInfo.state ) ) if bShowState
    console.log aLogLine.join ' '

exports.exec = ( program ) ->
    require( './utils' ).getVBoxes ( oResponse ) ->
        for sUID, oVMInfo of oResponse
            if program.running
                showVM oVMInfo, program.state if oVMInfo.state is 'running'
            else
                showVM oVMInfo, program.state
