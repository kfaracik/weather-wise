import React, {ReactNode} from 'react';
import {
  Dimensions,
  ImageBackground,

  SafeAreaView,
  StyleSheet,
} from 'react-native';
import backgroundImageSource from '@shared/assets/images/bg.webp';

type ScreenContainerProps = {
  children: ReactNode;
};

const {width: screenWidth, height: screenHeight} = Dimensions.get('window');

export const ScreenContainer = ({children}: ScreenContainerProps) => {
  return (
    <ImageBackground
      blurRadius={16}
      source={backgroundImageSource}
      style={styles.backgroundImage}>
      <SafeAreaView style={styles.safeArea}>{children}</SafeAreaView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: screenHeight,
    width: screenWidth,
  },
  safeArea: {
    flex: 1,
    width: '100%',
    margin: 16,
  },
});
