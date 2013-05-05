#!/usr/bin/env node
/*
 * vibox
 * https://github.com/leny/vibox
 *
 * Copyright (c) 2013 Leny
 * Licensed under the MIT license.
*/

"use strict";

var program, vibox_pkg;

program = require('commander');

vibox_pkg = require('../package.json');

program.version(vibox_pkg.version);

program.command('list').description('list VMs').option('-s, --state', 'Display state').option('-r, --running', 'Show running VMs only').action(require('./modules/list').exec);

program.parse(process.argv);
