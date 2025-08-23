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

# workspace boundaries
pnpm run [--filter=<PNPM_SELECTOR>] check:boundaries
```

#### Docs

```bash
# generate API docs for all packages using typedoc
pnpm run build:docs

# serve the documentation locally
pnpm run serve:docs
```

### Releases and Publishing

Adding changesets to the main branch will automatically create releases for the
affected packages and publish them to the registry.

<details><summary>🚀 <em>Continuous Integration Flow</em></summary>

```mermaid
flowchart LR

  subgraph ChecksWorkflow["<code>.github/workflows/checks.yml</code>"]
    PushToMain@{ shape: rounded, label: "📥 Push to Main" }
    Checks["Run all Checks and Tests."]
    ChecksPassed{Passed?}
    Changesets{Changesets?}
    ReleaseEventDispatch@{ shape: rounded, label: "🎉 Release Event" }

    direction TB
    PushToMain --> Checks
    Checks --> ChecksPassed
    ChecksPassed -- "Yes." --> Changesets
    Changesets -- "Present." --> ReleaseEventDispatch
  end

  subgraph ReleaseWorkflow["<code>.github/workflows/release.yml</code>"]
    ReleaseEvent@{ shape: rounded, label: "🎉 Release Event" }
    IntegrateAndIncrement["Integrate Changesets.<br>Increment Versions."]
    CollectPackages["Collect affected Packages.<br>(Direct and Transitive)"]
    CommitAndPushChanges["Commit & Push Changes."]
    PushReleaseTags["🏷️ Push a Tag for each<br><code>&lt;PACKAGE&gt;/v&lt;VERSION&gt;</code>."]

    direction TB
    ReleaseEvent --> IntegrateAndIncrement
    IntegrateAndIncrement --> CollectPackages
    CollectPackages --> CommitAndPushChanges
    CommitAndPushChanges --> PushReleaseTags
  end

  subgraph PublishWorkflow["<code>.github/workflows/publish.yml</code>"]
    TagEvent@{ shape: rounded, label: "🏷️ Tag Pushed<br><code>&lt;PACKAGE&gt;/v&lt;VERSION&gt;</code>." }
    BuildPackage["Build Package.<br>Create Tarball."]
    AggregateReleaseData["Collect Package Data<br>and Changelog Excerpts."]
    CreateRelease["🎁 Create a GitHub Release"]
    IsPrivate{"Private?"}
    NPM[🚀 Publish to npm Registry.]

    direction TB
    TagEvent --> BuildPackage
    BuildPackage --> AggregateReleaseData
    AggregateReleaseData --> CreateRelease
    CreateRelease --> IsPrivate
    IsPrivate link3@-- "No." --> NPM
  end

  ChecksWorkflow link1@=== ReleaseWorkflow
  ReleaseWorkflow link2@=== PublishWorkflow

  classDef animate stroke-dasharray: 9,5,stroke-dashoffset: 900,animation: dash 25s linear infinite;
  class link1 animate
  class link2 animate

  classDef transparent fill:transparent,color:#808080
  class ChecksWorkflow transparent
  class ReleaseWorkflow transparent
  class PublishWorkflow transparent
```

</details>

## Changelog

👉 [`./packages/changelog/CHANGELOG.md`](./packages/changelog/CHANGELOG.md)

## License

[MIT © Simon Lepel](http://simbo.mit-license.org/)
