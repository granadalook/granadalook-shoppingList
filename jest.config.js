module.exports = {
  preset: 'react-native',
  transformIgnorePatterns: [
    'node_modules/(?!(react-native' +
      '|@react-native' +
      '|@react-navigation' +
      '|react-redux' +
      '|react-native-toast-message' +
      '|@react-native-community' +
      ')/)',
  ],
  setupFilesAfterEnv: ['@testing-library/jest-native/extend-expect'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
   collectCoverageFrom: [
    'src/**/*.{ts,tsx}',
    '!src/config.ts',
    '!src/**/index.ts',
    '!src/**/types.ts',
    '!src/store/**',
    '!src/test/**',
  ],
};

