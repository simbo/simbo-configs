# Clirk - The CLI Clerk

[📦 **`@simbo/clirk`**](https://npmjs.com/package/@simbo/clirk)

A utility that simplifies creating Node.js CLIs and provides **common CLI
functionalities** out of the box.

## Features

- ⚙️ Parses command-line arguments with
  [`minimist`](https://www.npmjs.com/package/minimist)

- ℹ️ Auto-handles `--help` and `--version` flags (unless overridden)

- 📝 Provides formatted help and version messages

- 🛑 Handles `SIGINT` (<kbd>Ctrl</kbd>+<kbd>C</kbd>) gracefully with
  customizable messages

- 📊 Exposes structured metadata (title, description, parameters, options,
  examples)

- 📘 Fully typed with TypeScript

## Installation

Install `@simbo/clirk` from the npm registry:

```bash
npm i [-D] @simbo/clirk
```

## Usage

For a complete API reference, see the
[documentation](https://simbo.codes/packages/modules/_simbo_clirk/).

### Examples

#### Define CLI Options

```ts
import type { ClirkOptions } from '@simbo/clirk';

export const CLI_OPTIONS: ClirkOptions = {
  argsOptions: {
    // minimist options for parsing command line arguments
  },
  name: 'my-cli',
  title: 'My CLI Tool',
  description: 'An awesome CLI tool.',
};
```

#### Bootstrap the CLI

```ts
import { clirk } from '@simbo/clirk';
import { CLI_OPTIONS } from './cli-options.js';

export async function main() {
  const { args } = clirk(CLI_OPTIONS);
  // Arguments are parsed.
  // --help and --version commands are available.
  // SIGINT handling is set up.
}
```

#### Add Error Handling

Wrap your CLI entrypoint with
[`clitch`](https://simbo.codes/packages/functions/_simbo_clirk.clitch.clitch/)
to ensure errors and exits are handled consistently:

```ts
#!/usr/bin/env node
import { clitch } from '@simbo/clirk/clitch';
import { main } from './main.js';

await clitch(main);
```

## License

[MIT © Simon Lepel](http://simbo.mit-license.org/2025/)
