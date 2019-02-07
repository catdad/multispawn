# multispawn

This is a simple CLI that will let you run multiple commands, at the same time, in the foreground. This is similar to `bash`s ability to run programs in the background (`&`) along with a `wait`, but works cross-pratform.

## Example:

```bash
npx multispawn npx http-server -p 8000; npx localtunnel --port 8000
```

The above code is functionally equivalent to:

```bash
npx http-server -p 8000 &
npx localtunnel --port 8000
wait
```
