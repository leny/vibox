#!/usr/bin/env node
/*
 * vibox
 * https://github.com/leny/vibox
 *
 * Copyright (c) 2013 Leny
 * Licensed under the MIT license.
*/

/*jshint globalstrict:true, node:true, boss:true */

"use strict";

var exec = require( 'child_process' ).exec;
var os = require( 'os' );

var aVBoxes = [],
    aAvailableCommands = [ 'start', 'list' ],
    rVMName = /^"(.+)"\s\{(.+)\}$/i;

var getVBoxes = function( fCallback ) {
    var aVMs, i, sVMName, aMatches;
    exec( 'VBoxManage list vms', function( oError, sOut, sErr ) {
        if( oError ) {
            // TODO
        }
        aVMs = sOut.split( os.EOL );
        for( i = -1; sVMName = aVMs[ ++i ]; ) {
            if( aMatches = sVMName.match( rVMName ) ) {
                aVBoxes.push( aMatches[ 1 ], aMatches[ 2 ] );
            }
        }
        fCallback();
    } );
}; // getVBoxes
