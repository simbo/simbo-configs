# Simbo's Configurations

A monorepo for my shared configurations.

## Packages

- [`@simbo/commitlint-config`](./packages/commitlint-config)

- [`@simbo/cspell-config`](./packages/cspell-config)

- [`@simbo/prettier-config`](./packages/prettier-config)

- [`@simbo/tsconfig`](./packages/tsconfig)

## Development

### Requirements

- node.js (v22) via [nvm](https://github.com/nvm-sh/nvm)
- [pnpm](https://pnpm.io/) (v10)

### Setup

```bash
git clone git@github.com:simbo/simbos-configs.git
cd simbos-configs
pnpm install
pnpm run build
```

### Usage

```bash
# build a package
pnpm run build --filter=@simbo/tsconfig

# check for dependency updates using npm-check-updates
pnpm run update:patch
pnpm run update:minor
pnpm run update:latest

# run all checks and builds before push
pnpm run preflight
```

## Changelog

👉 [`./packages/changelog/CHANGELOG.md`](./packages/changelog/CHANGELOG.md)

## License

[MIT © Simon Lepel](http://simbo.mit-license.org/)
