###
 * vibox
 * https://github.com/leny/vibox
 *
 * Copyright (c) 2013 Leny
 * Licensed under the MIT license.
###

"use strict"

program = require 'commander'
vibox_pkg = require '../package.json'

program
    .version( vibox_pkg.version )

program
    .command( 'list' )
    .description( 'list VMs' )
    .option( '-s, --state', 'Display state' )
    .option( '-r, --running', 'Show running VMs only' )
    .action( require( './modules/list' ).exec )

program
    .command( 'show <uid|name>' )
    .description( 'show information about specific VM' )
    .option( '-f, --full', 'Display full informations' )
    .action( require( './modules/show' ).exec )

program.parse( process.argv )
