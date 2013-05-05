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

parseCommand = ( sVMIdentifier, sAction ) ->
    require( './utils' ).getVBoxes ( oResponse ) ->
        sVMIdentifier = sVMIdentifier.trim()
        for sUID, oVM of oResponse
            if sUID is sVMIdentifier or oVM.name is sVMIdentifier or oVM.escaped_name is sVMIdentifier
                switch sAction
                    when 'start' then return startVM oVM, no
                    when 'headless' then return startVM oVM, yes
                    when 'stop' then return controlVM oVM, 'acpipowerbutton' # TODO: check acpi support !
                    when 'pause', 'resume', 'reset', 'poweroff'
                        return controlVM oVM, sAction
                    else return console.log clc.red.bold 'Unknow action "' + sAction + '"'
        console.log clc.red.bold 'Unknown VM "' + sVMIdentifier + '"'

exports.start = ( vm, program ) ->
    parseCommand vm, ( if program.headless then 'headless' else 'start' )

exports.control = ( vm, action, program ) ->
    parseCommand vm, action
