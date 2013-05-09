"use strict"

os = require 'os'

exports.commands = ->
    console.log 'list'
    console.log 'show'
    console.log 'start'
    console.log 'headless'
    console.log 'stop'
    console.log 'control'

exports.vms = ->
    require( './utils' ).getVBoxes ( oResponse ) ->
        for sUID, oVMInfo of oResponse
            console.log oVMInfo.escaped_name + os.EOL

exports.control = ->
    console.log 'start'
    console.log 'headless'
    console.log 'stop'
    console.log 'pause'
    console.log 'resume'
    console.log 'reset'
    console.log 'poweroff'
