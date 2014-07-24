#!/usr/bin/env node

/*
 * vibox
 * https://github.com/leny/vibox
 *
 * Copyright (c) 2013 Leny
 * Licensed under the MIT license.
 */
"use strict";
var path, program, vibox_pkg, word;

path = require('path');

program = require('commander');

vibox_pkg = require('../package.json');

word = function(val) {
  return val;
};

program.version(vibox_pkg.version).option('--initpath', '[internal] init path completion');

program.command('list').description('list VMs').option('-s, --state', 'Display state').option('-r, --running', 'Show running VMs only').action(require('./modules/list').exec);

program.command('show <uid|name>').description('show information about specific VM').option('-f, --full', 'Display full informations').action(require('./modules/show').exec);

program.command('start <uid|name>').description('start VM').option('-h, --headless', 'Start VM headless (no GUI)').action(require('./modules/control').start);

program.command('headless <uid|name>').description('start VM headless (no GUI)').action(require('./modules/control').headless);

program.command('stop <uid|name>').description('stop VM using ACPI module (if enabled)').action(require('./modules/control').stop);

program.command('control <uid|name> <action>').description('control VM (start|headless|pause|resume|stop|reset|poweroff)').action(require('./modules/control').control);

program.command('commands').description('[internal] list all commands (used for completion)').action(require('./modules/completion').commands);

program.command('completions <cmd>').description('[internal] list escaped VMs names (used for completion)').action(require('./modules/completion').vms);

program.command('control_compl').description('[internal] list command for control (used for completion)').action(require('./modules/completion').control);

program.parse(process.argv);

if (program.initpath) {
  console.log(path.resolve(__dirname + '/../shell/init'));
}
