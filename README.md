# Simbo's Packages

A monorepo for my packages.

<!-- TOC depthFrom:2 depthTo:3 -->

- [Packages](#packages)
- [Development](#development)
  - [Requirements](#requirements)
  - [Setup](#setup)
  - [Toolset](#toolset)
  - [Usage](#usage)
  - [Releases and Publishing](#releases-and-publishing)
- [Changelog](#changelog)
- [License](#license)

<!-- /TOC -->

---

## Packages

TBD

## Development

### Requirements

- a linux-based operating system
- node.js (v22) via [nvm](https://github.com/nvm-sh/nvm)
- [pnpm](https://pnpm.io/) (v10)

### Setup

```bash
git clone git@github.com:simbo/packages.git
cd simbos-packages
pnpm install
pnpm run build
```

### Toolset

- Repository Management
  - [pnpm](https://pnpm.io/)
  - [Turborepo](https://turbo.build/)
  - [Changesets](https://github.com/changesets/changesets#readme)
  - [Commitlint](https://commitlint.js.org/)

- Documentation
  - [TypeDoc](https://typedoc.org/)

- Testing and Quality Control
  - [Vitest](https://vitest.dev/)
  - [ESLint](https://eslint.org/)
  - [Prettier](https://prettier.io/)
  - [CSpell](https://cspell.org/)

### Usage

#### Building

```bash
# build all packages
pnpm run build

# build a package
pnpm run build --filter=<TURBO_SELECTOR>
```

#### Dependencies

```bash
# install dependencies for all workspaces
pnpm install

# add a dependency to a workspace
pnpm add --filter=<PNPM_SELECTOR> [-D] <DEPENDENCY>

# remove a dependency from a workspace
pnpm remove --filter=<PNPM_SELECTOR> <DEPENDENCY>

# interactively update the dependency catalogs for all workspaces
pnpm update --recursive --interactive --latest
```

#### Tests

```bash
# run all tests for all packages
pnpm run test
# or for a specific package
pnpm run --filter=<PNPM_SELECTOR> test

# run tests in watch mode
pnpm run [--filter=<PNPM_SELECTOR>] test:watch

# run tests in ui mode
pnpm run [--filter=<PNPM_SELECTOR>] test:ui
```

#### Checks

```bash
# run all possible checks, builds, and tests
pnpm run preflight

# run all checks for all packages
pnpm run check

# prettier
pnpm run [--filter=<PNPM_SELECTOR>] check:format
pnpm run [--filter=<PNPM_SELECTOR>] fix:format

# eslint
pnpm run [--filter=<PNPM_SELECTOR>] check:eslint
pnpm run [--filter=<PNPM_SELECTOR>] fix:eslint

# cspell
pnpm run [--filter=<PNPM_SELECTOR>] check:spelling

# types
pnpm run [--filter=<PNPM_SELECTOR>] check:types

#
```

### Releases and Publishing

Adding changesets to the main branch will automatically trigger releases and
publish the affected packages.

## Changelog

👉 [`./packages/changelog/CHANGELOG.md`](./packages/changelog/CHANGELOG.md)

## License

[MIT © Simon Lepel](http://simbo.mit-license.org/)
