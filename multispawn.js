#!/usr/bin/env node

var join = require('command-join');
var shellton = require('shellton');

var commands = join(process.argv.slice(2))
.split(';')
.map(function (p) {
  return p.trim();
});

if (commands.length === 0) {
  console.log('multispawn: run multiple processes at the same time');
  console.log('');
  console.log('usage:');
  console.log('  multispawn command 1; command 2; command 3;');
  console.log('');
  console.log('all commands will run concurrently, and the process will exit once');
  console.log('all commands have exited');
}

commands.forEach(function (command) {
  shellton({
    task: command,
    stdout: 'inherit',
    stderr: 'inherit'
  }, function (err) {
    if (err) {
      process.exitCode = 1;
    }
  });
});
