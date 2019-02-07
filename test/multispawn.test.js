/* jshint mocha: true, node: true */
/* globals Promise */

var spawn = require('child_process').spawn;
var root = require('rootrequire');
var expect = require('chai').expect;

describe('multispawn', function () {
  function collect(stream) {
    var output = [];

    stream.on('data', function (chunk) { output.push(chunk); });

    return output;
  }

  function run(args) {
    return new Promise(function (resolve, reject) {
      var proc = spawn('node', ['multispawn.js'].concat(args), {
        stdio: ['ignore', 'pipe', 'pipe'],
        cwd: root
      });
      var stdout = collect(proc.stdout);
      var stderr = collect(proc.stderr);

      proc.on('error', reject);
      proc.on('exit', function (code) {
        resolve({
          code: code,
          stdout: Buffer.concat(stdout).toString().trim(),
          stderr: Buffer.concat(stderr).toString().trim()
        });
      });
    });
  }

  it('calls a single command line process', function () {
    return run(['echo', 'pineapples']).then(function (result) {
      expect(result.code).to.equal(0);
      expect(result.stdout).to.equal('pineapples');
      expect(result.stderr).to.equal('');
    });
  });

  it('calls mutliple command line processes');

  it('exits with an error if any process exits with an error');

  it('handles arguments that need to be escaped');
});
