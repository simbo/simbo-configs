# Simbo's Prettier Configuration

A shared [Prettier](https://prettier.io/) configuration.

## Usage

Install Prettier, the required plugins, and the configuration:

```bash
npm i -D prettier @ianvs/prettier-plugin-sort-imports prettier-plugin-organize-attributes @simbo/prettier-config
```

Then create a
[Prettier configuration file](https://prettier.io/docs/configuration) in the
root of your project.

And your done. 🍻

### Example `.prettierrc`

```json
"@simbo/prettier-config"
```

### Example `.prettierrc.js`

Extending the shared configuration is only possible using JavaScript or
TypeScript.

```js
import simboPrettierConfig from '@simbo/prettier-config';

/**
 * @see https://prettier.io/docs/configuration
 * @type {import("prettier").Config}
 */
export default {
  ...simboPrettierConfig,
  // add custom settings here
};
```

## License

[MIT © Simon Lepel](http://simbo.mit-license.org/)
