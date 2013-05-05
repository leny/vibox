exec = require( 'child_process' ).exec
clc = require 'cli-color'
os = require 'os'

startVM = ( oVM, bHeadless ) ->
    if oVM.state is 'running' or oVM.state is 'paused'
        return console.log clc.yellow( 'VM "' + oVM.name + '" is already running !' )
    sCommand = 'VBoxManage startvm ' + oVM.UUID + ( if bHeadless then ' --type headless' else '' )
    console.log clc.yellow( 'VM "' + oVM.name + '" starting...' )
    return exec sCommand, ( oError, sOut, sErr ) ->
        console.log clc.green 'started.' if !oError

controlVM = ( oVM, sAction ) ->
    exec 'VBoxManage controlvm ' + oVM.UUID + ' ' + sAction, ( oError, sOut, sErr ) ->
        console.log sOut if !oError

exports.start = ( vm, program ) ->
    require( './utils' ).getVBoxes ( oResponse ) ->
        sVMSearchClause = vm.trim()
        for sUID, oVM of oResponse
            if sUID is sVMSearchClause or oVM.name is sVMSearchClause
                return startVM oVM, program.headless
        console.log clc.red.bold 'Unknown VM "' + sVMSearchClause + '"'

exports.control = ( vm, action, program ) ->
    require( './utils' ).getVBoxes ( oResponse ) ->
        sVMSearchClause = vm.trim()
        for sUID, oVM of oResponse
            if sUID is sVMSearchClause or oVM.name is sVMSearchClause
                switch action
                    when 'start' then return startVM oVM, no
                    when 'headless' then return startVM oVM, yes
                    when 'stop' then return controlVM oVM, 'acpipowerbutton'
                    when 'pause', 'resume', 'reset', 'poweroff'
                        return controlVM oVM, action
                    else return console.log clc.red.bold 'Unknow action "' + action + '"'
        console.log clc.red.bold 'Unknown VM "' + sVMSearchClause + '"'
