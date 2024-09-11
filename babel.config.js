module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./src'],
        extensions: ['.ios.js', '.android.js', '.js', '.ts', '.tsx', '.json'],
        alias: {
          '@shared/assets': './src/shared/assets',
          '@shared/components': './src/shared/components/index.ts',
          '@features/forecast': './src/features/forecast/index.ts',
          '@api': './src/api/index.ts',
          '@navigation/constants': './src/navigation/constants/index.ts',
        },
      },
    ],
    // react-native-reanimated/plugin has to be listed last
    'react-native-reanimated/plugin',
  ],
};
