#!/usr/bin/env node

'use strict';

const curver = require('curver');

const colors = require('colors/safe');

const argv = require('yargs')
	.usage(colors.cyan.bold('\n Usage : $0 <command> [package-name]'))
	.command('u', ' ❱ node package\'s name')
	.demand(['u'])
	.example(colors.cyan.bold('$0 -u chi-squared'))
	.argv;

const sendMessage = 'Latest vesrion of' + ' ' + argv.u + ' ' + ':';

console.log(sendMessage);

curver(argv.u).then(console.log);
