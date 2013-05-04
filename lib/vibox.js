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

var repl = require( 'repl' );

var aArgs = process.argv.slice( 2 );

if( !aArgs.length ) {
    console.log( "Type 'vibox help' for usage." );
    process.exit();
}

switch( aArgs[ 0 ] ) {
    case 'list':
        require( './commands/list' ).exec();
        break;

    case 'help':
        require( './commands/help' ).exec( aArgs.splice( 1 ) );
        break;

    default:
        console.log( "Unknown command: '" + aArgs[ 0 ] + "'" );
        console.log( "Type 'vibox help' for usage." );
}
