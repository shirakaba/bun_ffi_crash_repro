# bun_ffi_crash_repro

A minimal reproduction of Bun crashing without debug output when calling into Python.

## Installation

We're going to be calling into Python from Bun, so ensure that you have [Python 3](https://wiki.python.org/moin/BeginnersGuide/Download) and [Pip](https://pip.pypa.io/en/stable/) and install these packages for Python:

```bash
# https://github.com/polm/fugashi
# This is our Japanese text processing library.
pip install fugashi

# https://github.com/polm/unidic-py
# This is an 800 MB dictionary file for Japanese (the tool depends on it).
# Sorry for the disk usage!
pip install unidic

bun install
```

## Running

Be sure to run it a few times, as the problem is indeterministic.

```bash
bun run index.ts
```

In a test success, we'll see both console logs.

> Running…
> …Survived!


In a test failure, we'll get just the initial console log and Bun will crash before the second log, without giving any debug output whatsoever.

> Running…
