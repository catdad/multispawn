/* jshint mocha: true, node: true */
/* globals Promise */

var spawn = require('child_process').spawn;
var path = require('path');
var root = require('rootrequire');
var expect = require('chai').expect;

describe('multispawn', function () {
  function collect(stream) {
    var output = [];

    stream.on('data', function (chunk) { output.push(chunk); });

    return output;
  }

  function run(args) {
    var proc = spawn('node', ['multispawn.js'].concat(args), {
      stdio: ['ignore', 'pipe', 'pipe'],
      cwd: root
    });
    var stdout = collect(proc.stdout);
    var stderr = collect(proc.stderr);
    var code = 0;
    var err = null;

    return Promise.all([
      new Promise(function (resolve, reject) {
        proc.on('error', reject);
        proc.on('close', function () {
          resolve();
        });
      }),
      new Promise(function (resolve) {
        proc.on('exit', function (c) {
          code = c;
          resolve();
        });
      })
    ]).then(function () {
      return {
        code: code,
        stdout: Buffer.concat(stdout).toString().trim(),
        stderr: Buffer.concat(stderr).toString().trim()
      };
    });
  }

  it('calls a single command line process', function () {
    return run(['echo', 'pineapples']).then(function (result) {
      expect(result.code).to.equal(0);
      expect(result.stdout).to.equal('pineapples');
      expect(result.stderr).to.equal('');
    });
  });

  it('calls mutliple command line processes', function () {
    return run(['echo', 'pineapples', '!', 'echo', 'kiwis']).then(function (result) {
      expect(result.code).to.equal(0);
      expect(result.stdout).to.match(/pineapples/);
      expect(result.stdout).to.match(/kiwis/);
      expect(result.stderr).to.equal('');
    });
  });

  it('exits with an error if any process exits with an error', function () {
    return run(['echo', 'pineapples', '!', 'node', '-e', 'process.exit(1)']).then(function (result) {
      expect(result.code).to.equal(1);
      expect(result.stdout).to.equal('pineapples');
      expect(result.stderr).to.equal('');
    });
  });

  it('handles arguments that need to be escaped', function () {
    var cmd = /^win/.test(process.platform) ? 'dir' : 'ls';

    return run([cmd, path.join('fixtures', 'name with spaces')]).then(function (result) {
      expect(result.code).to.equal(0);
      expect(result.stdout).to.match(/thing\.txt/);
      expect(result.stdout).to.match(/stuff\.txt/);
      expect(result.stderr).to.equal('');
    });
  });
});
