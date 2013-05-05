"use strict"

os = require 'os'

exports.commands = ->
    console.log 'list'
    console.log 'show'
    console.log 'start'
    console.log 'control'

exports.vms = ->
    require( './utils' ).getVBoxes ( oResponse ) ->
        for sUID, oVMInfo of oResponse
            console.log oVMInfo.escaped_name + os.EOL
