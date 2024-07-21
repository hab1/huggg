// jest.config.js
module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    testMatch: ['**/?(*.)+(spec|test).[tj]s?(x)'],
    collectCoverage: true,
    coverageDirectory: 'coverage',
    coverageReporters: ['html', 'text'],
    testPathIgnorePatterns: [
        '/node_modules',
        '/utils',
        '/dist'
    ],
    moduleNameMapper: {
        '@src/(.*)': '<rootDir>/src/$1',
    }
};
