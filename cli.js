#!/usr/bin/env node

'use strict';

const dns = require('dns');
const got = require('got');
const cheerio = require('cheerio');
const logUpdate = require('log-update');
const ora = require('ora');
const updateNotifier = require('update-notifier');
const pkg = require('./package.json');

updateNotifier({pkg}).notify();
const arg = process.argv[2];
const spinner = ora();

dns.lookup('npmjs.com', err => {
	if (err) {
		logUpdate(`\n› Please check your internet connection! \n`);
		process.exit(1);
	} else {
		logUpdate();
		spinner.text = `Fetching the latest release of ${arg}`;
		spinner.start();
	}
});

if (!arg) {
	console.log(`
 Usage: curver <package-name>

 Example:
   $ curver express
	`);
	process.exit(1);
}

got(`https://npmjs.com/package/${arg}`).then(res => {
	const $ = cheerio.load(res.body);
	const version = $('.box li').eq(1).text().split('is')[0].trim();
	logUpdate(`\n› ${version} is the latest release of ${arg}\n`);
	spinner.stop();
});
