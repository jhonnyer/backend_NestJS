/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  rootDir: '.',   // Raíz del proyecto
  testMatch: ['**/test/**/*.spec.ts'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  transform: {
    '^.+\\.(t|j)s$': [
      'ts-jest',
      {
        tsconfig: 'tsconfig.json',
        diagnostics: false,
      },
    ],
  },
  moduleNameMapper: {
    '^src/(.*)$': '<rootDir>/src/$1',  // Mapea alias src/ a la carpeta src/
  },
  collectCoverageFrom: ['src/**/*.{ts,tsx,js,jsx}'],
  coveragePathIgnorePatterns: [
    'main.ts',
    '.*\\.module\\.ts',
    '.*\\.repository\\.ts',
    '.*\\.guard\\.ts',
  ],
};
