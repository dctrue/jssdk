// @ts-check
/* eslint-env node */

const { name } = require('./package.json')

/**
 * An object with Jest options.
 * @type {import('@jest/types').Config.InitialOptions}
 */
const options = {
  displayName: {
    name,
    color: 'green'
  },
  rootDir: '.',
  roots: ['<rootDir>/tests/'],
  collectCoverage: true,
  collectCoverageFrom: ['<rootDir>/src/**/*.ts'],
  coverageDirectory: 'coverage',
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/$1'
  },
  preset: 'ts-jest',
  resolver: 'ts-jest-resolver',
};

module.exports = options;
