#!/usr/bin/env node
const program = require('commander')
program
.action((name) => {
console.log('init: ' + name)
})
program.parse(process.argv)
console.warn('[by huazi] process.argv:',process.argv)
