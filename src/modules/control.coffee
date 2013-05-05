exec = require( 'child_process' ).exec
clc = require 'cli-color'
os = require 'os'

exports.start = ( vm, program ) ->
    require( './utils' ).getVBoxes ( oResponse ) ->
        sVMSearchClause = vm.trim()
        for sUID, oVM of oResponse
            if sUID is sVMSearchClause or oVM.name is sVMSearchClause
                if oVM.state is 'running' or oVM.state is 'paused'
                    return console.log clc.yellow( 'VM "' + oVM.name + '" is already running !' )
                sCommand = 'VBoxManage startvm ' + sUID + ( if program.headless then ' --type headless' else '' )
                console.log clc.yellow( 'VM "' + oVM.name + '" starting...' )
                return exec sCommand, ( oError, sOut, sErr ) ->
                    console.log clc.green 'started.' if !oError
        console.log clc.red.bold 'Unknown VM "' + sVMSearchClause + '"'
