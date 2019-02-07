#!/usr/bin/env node

var join = require('command-join');
var shellton = require('shellton');

if (process.argv.length < 3) {
  console.log('multispawn: run multiple processes at the same time');
  console.log('');
  console.log('usage:');
  console.log('  multispawn command 1 ! command 2 ! command 3');
  console.log('');
  console.log('all commands will run concurrently, and the process will exit once');
  console.log('all commands have exited');
}

var commands = process.argv.slice(2)
.reduce(function (memo, arg) {
  if (arg === '!') {
    memo.push([]);
    return memo;
  }

  memo.slice(-1)[0].push(arg);
  return memo;
}, [[]]).filter(function (arr) {
  return arr.length;
}).map(function (arr) {
  return join(arr).trim();
});

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
