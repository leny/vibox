/*
 * vibox
 * https://github.com/leny/vibox
 *
 * utils
 *
 * Copyright (c) 2013 Leny
 * Licensed under the MIT license.
*/

var exec = require( 'child_process' ).exec,
    os = require( 'os' );

var oVBoxes = {},
    aVBoxesUIDs = [],
    iCurrentIndex = 0,
    aAvailableCommands = [ 'start', 'list' ],
    rVMName = /^".+"\s\{(.+)\}\s*$/,
    rClearQuotes = /"/g;

var getVBoxes = function( fCallback ) {
    var aVMs, i, sCurrentVMID;
    exec( 'VBoxManage list vms', function( oError, sOut, sErr ) {
        if( oError ) {
            // TODO
        }
        sOut.split( os.EOL ).forEach( function( elt ) {
            aVBoxesUIDs.push( ( aMatch = rVMName.exec( elt ) ) ? aMatch[ 1 ] : null );
        } );
        aVBoxesUIDs = aVBoxesUIDs.filter( function( elt ) { return elt; } );
        iCurrentIndex = aVBoxesUIDs.length;
        for( i = -1; sCurrentVMID = aVBoxesUIDs[ ++i ]; ) {
            exec( 'VBoxManage showvminfo ' + sCurrentVMID + ' --machinereadable', function( oError, sOut, sErr ) {
                var oVMInfos, i, aVMInfos, sCurrentInfo, aCurrentInfo;
                if( oError ) {
                    // TODO
                }
                aVMInfos = sOut.split( os.EOL );
                oVMInfos = {};
                for( i = -1; sCurrentInfo = aVMInfos[ ++i ]; ) {
                    aCurrentInfo = sCurrentInfo.split( '=' );
                    oVMInfos[ aCurrentInfo[ 0 ] ] = aCurrentInfo[ 1 ].replace( rClearQuotes, '' );
                }
                oVMInfos.state = oVMInfos.VMState;
                oVBoxes[ oVMInfos.UUID ] = oVMInfos;
                iCurrentIndex--;
                if( iCurrentIndex === 0 )
                    fCallback( oVBoxes );
            } );
        }
   } );
}; // getVBoxes

exports.getVBoxes = getVBoxes;
