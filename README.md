# multispawn

[![travis][travis.svg]][travis.link]
[![appveyor][appveyor.svg]][appveyor.link]
[![cov-codeclimate][cov-codeclimate.svg]][cov-codeclimate.link]
[![score-codeclimate][score-codeclimate.svg]][score-codeclimate.link]
[![npm-downloads][npm-downloads.svg]][npm.link]
[![npm-version][npm-version.svg]][npm.link]
[![dm-david][dm-david.svg]][dm-david.link]

[travis.svg]: https://travis-ci.com/catdad/multispawn.svg?branch=master
[travis.link]: https://travis-ci.com/catdad/multispawn
[appveyor.svg]: https://ci.appveyor.com/api/projects/status/github/catdad/multispawn?branch=master&svg=true
[appveyor.link]: https://ci.appveyor.com/project/catdad/multispawn
[cov-codeclimate.svg]: https://codeclimate.com/github/catdad/multispawn/badges/coverage.svg
[cov-codeclimate.link]: https://codeclimate.com/github/catdad/multispawn/coverage
[score-codeclimate.svg]: https://codeclimate.com/github/catdad/multispawn/badges/gpa.svg
[score-codeclimate.link]: https://codeclimate.com/github/catdad/multispawn
[npm-downloads.svg]: https://img.shields.io/npm/dm/multispawn.svg
[npm.link]: https://www.npmjs.com/package/multispawn
[npm-version.svg]: https://img.shields.io/npm/v/multispawn.svg
[dm-david.svg]: https://david-dm.org/catdad/multispawn.svg
[dm-david.link]: https://david-dm.org/catdad/multispawn

This is a simple CLI that will let you run multiple commands, at the same time, in the foreground. This is similar to `bash`'s ability to run programs in the background (`&`) along with a `wait`, but works cross-platform. Just type all your commands the way you would put them in your terminal and split them with `!`.

## Example:

```bash
npx multispawn npx http-server -p 8000 ! npx localtunnel --port 8000
```

The above code is functionally equivalent to this bit in `bash`:

```bash
npx http-server -p 8000 &
npx localtunnel --port 8000 &
wait
```
