module.exports = {
  testEnvironment: 'node',
  collectCoverageFrom: [
    'src/**/*.js',
    '!src/**/node_modules/**'
  ],
  testMatch: [
    '**/test/**/*.test.js'
  ]
};
