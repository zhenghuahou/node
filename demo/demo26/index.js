#!/usr/bin/env node

/**
 * Module dependencies.
 */
var program = require('commander');

function list(val) {
  return val.split(',').map(Number);
}

program
  .version('0.0.1')
  .option('-t, --template-engine [engine]', 'Add template [engine] support', 'jade by jhouzhenghua')
  .option('-c, --cheesehou [type]', 'Add the specified type of cheese [marble]', 'huazi')
  .option('-l, --list [items]', 'Specify list items defaulting to 1,2,3', list, [1,2,3])
  .parse(process.argv);

console.log('  - %s template engine', program.templateEngine);
console.log('  - %s cheese', program.cheese);
console.log('  - %s 【cheese】', program.cheesehou);
console.log('  - %j', program.list);
