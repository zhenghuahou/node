#!/usr/bin/env node
const program = require('commander')
program.version(require('../package').version, '-v', '--version')
.command('init <name>', 'init project')
.command('refresh','refresh routers...')
program.parse(process.argv)
