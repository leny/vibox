/*
 * vibox
 * https://github.com/leny/vibox
 *
 * COMMANDS: help
 *
 * Copyright (c) 2013 Leny
 * Licensed under the MIT license.
*/

var os = require( 'os' ),
    vibox = require( '../../package.json' );

var oSubCommandsHelp = {
    list: function() {
        console.log( 'TODO' );
    },
    start: function() {
        console.log( 'TODO' );
    }
};

var showCompleteHelp = function() {
    var aHelpLines = [],
        sSubCommand;

    aHelpLines.push( "usage: vibox <subcommand> [options] [args]" );
    aHelpLines.push( vibox.name + " - " + vibox.description + ', version ' + vibox.version );
    aHelpLines.push( "Type 'vibox help <subcommand>' for help on a specific subcommand." );
    aHelpLines.push( '' );
    aHelpLines.push( 'Available subcommands:' );
    for( sSubCommand in oSubCommandsHelp ) {
        aHelpLines.push( "\t" + sSubCommand );
    }
    aHelpLines.push( '' );
    aHelpLines.push( 'For additional information, see ' + vibox.homepage );

    console.log( aHelpLines.join( os.EOL ) );
}; // showCompleteHelp

exports.exec = function( aArgs ) {
    var sSubCommand;

    if( !aArgs.length ) {
        return showCompleteHelp();
    }

    sSubCommand = aArgs[ 0 ];

    if( typeof oSubCommandsHelp[ sSubCommand ] === 'function' ) {
        oSubCommandsHelp[ sSubCommand ]();
    } else {
        console.log( '"' + sSubCommand + '": unknown command.' );
    }
};
