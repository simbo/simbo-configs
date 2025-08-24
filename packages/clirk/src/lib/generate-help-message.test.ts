import type { PackageNormalized } from '@simbo/find-up-package';
import { describe, expect, it } from 'vitest';
import { dim, underline, yellow } from 'yoctocolors';

import type { ClirkContextWithoutMessages } from '../clirk.types.js';

import { generateHelpMessage } from './generate-help-message.js';

describe('generateHelpMessage', () => {
  const baseContext = {
    icon: '🧪',
    title: 'Test CLI',
    name: 'test-cli',
    description: ['A test CLI to verify the help output.'],
    package: {
      path: '/path/to/package',
      packageJson: {
        name: 'test-cli',
        version: '1.0.0',
        homepage: 'https://example.com',
      },
    },
    examples: ['test-cli run', 'test-cli test'],
    usage: ['Use this CLI to test stuff.'],
    usageLabel: 'USAGE',
    parameters: new Map([
      ['INPUT', { description: ['Input file path.'] }],
      ['OUTPUT', { description: ['Output file path.'] }],
    ]),
    parametersLabel: 'PARAMETERS',
    options: new Map([
      [
        'verbose',
        {
          description: ['Enable verbose logging.'],
          aliases: new Set(['v']),
          isBoolean: true,
          isString: false,
        },
      ],
      [
        'config',
        {
          description: ['Path to config file.'],
          aliases: new Set(['c']),
          isBoolean: false,
          isString: true,
        },
      ],
    ]),
    optionsLabel: 'OPTIONS',
  } as ClirkContextWithoutMessages;

  it('generates a complete help message with all sections', () => {
    const result = generateHelpMessage(baseContext);

    expect(result).toContain('test-cli — Test CLI');
    expect(result).toContain('test-cli v1.0.0');
    expect(result).toContain(underline('https://example.com'));
    expect(result).toContain('USAGE:');
    expect(result).toContain('test-cli run');
    expect(result).toContain('Use this CLI to test stuff.');
    expect(result).toContain('PARAMETERS:');
    expect(result).toContain('INPUT');
    expect(result).toContain('OPTIONS:');
    expect(result).toContain('--verbose');
    expect(result).toContain(`${yellow('--config')}${dim('=<VALUE>')}`);
    expect(result).toContain('Alias: -v');
    expect(result).toContain('Alias: -c');
  });

  it('renders options without aliases and without string type correctly', () => {
    const result = generateHelpMessage({
      ...baseContext,
      usage: [],
      options: new Map([
        [
          'dry-run',
          {
            description: ['Runs without making changes.'],
            aliases: new Set(),
            isBoolean: true,
            isString: false,
          },
        ],
      ]),
    });

    expect(result).toContain('--dry-run');
    expect(result).not.toContain('Aliases:');
  });

  it('skips homepage and icon when missing', () => {
    const result = generateHelpMessage({
      ...baseContext,
      icon: undefined,
      package: {
        packageJson: {
          name: 'test-cli',
          version: '1.0.0',
        },
      } as PackageNormalized,
    });

    expect(result).toContain('test-cli — Test CLI');
    expect(result).not.toContain('https://example.com');
  });

  it('renders aliases with mixed lengths and applies correct prefixing', () => {
    const result = generateHelpMessage({
      ...baseContext,
      options: new Map([
        [
          'mode',
          {
            description: ['Select the mode.'],
            aliases: new Set(['m', 'mode', 'M']),
            isBoolean: false,
            isString: true,
          },
        ],
      ]),
    });

    expect(result).toContain('Aliases: -m, --mode, -M');
  });

  it('renders multiple aliases with correct plural label', () => {
    const result = generateHelpMessage({
      ...baseContext,
      options: new Map([
        [
          'log',
          {
            description: ['Set log level.'],
            aliases: new Set(['l', 'log', 'logfile']),
            isBoolean: false,
            isString: true,
          },
        ],
      ]),
    });

    expect(result).toMatch(/Aliases: (-l|--log|--logfile)(, )?/);
    expect(result).toContain('Aliases:');
  });

  it('renders empty parameters and options sections gracefully', () => {
    const result = generateHelpMessage({
      ...baseContext,
      parameters: new Map(),
      options: new Map(),
    });

    expect(result).not.toContain('PARAMETERS:');
    expect(result).not.toContain('OPTIONS:');
  });

  it('renders all aliases with correct dashes for various edge names', () => {
    const result = generateHelpMessage({
      ...baseContext,
      options: new Map([
        [
          'x-opt',
          {
            description: ['Some desc.'],
            aliases: new Set(['x', 'xopt', '3', '_hidden']),
            isBoolean: true,
            isString: false,
          },
        ],
      ]),
    });

    expect(result).toContain('Aliases: -x, --xopt, -3, --_hidden');
  });
});
