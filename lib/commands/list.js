/*
 * vibox
 * https://github.com/leny/vibox
 *
 * COMMANDS: list
 *
 * Copyright (c) 2013 Leny
 * Licensed under the MIT license.
*/

exports.exec = function() {
    require( '../utils' ).getVBoxes( function( oResponse ) {
        var sUID;
        for( sUID in oResponse ) {
            console.log( oResponse[ sUID ].name + ' {' + sUID + '}' + ' : ' + oResponse[ sUID ].state );
        }
    } );
};
