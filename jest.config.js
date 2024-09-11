module.exports = {
  preset: 'react-native',
  setupFiles: ['./jestSetup.js'],
  // transformIgnorePatterns: ["/node_modules/@react-native-community/async-storage/(?!(lib))"],
  transformIgnorePatterns: [
    'node_modules/(?!react-native|react-native-reanimated|@react-native|react-navigation)',
    '/node_modules/@react-native-community/async-storage/(?!(lib))',
  ],
  coveragePathIgnorePatterns: ['index.ts', 'src/api/', 'src/shared/assets/'],
  testMatch: [' **/__tests__/**/*.[jt]s?(x)', '**/?(*.)+(spec|test).[tj]s?(x)'],
};
