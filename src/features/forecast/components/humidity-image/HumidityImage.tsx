import React from 'react';
import {Image, StyleSheet, View} from 'react-native';
import lowHumidityImage from '@shared/assets/images/sun.webp';
import moderateLowHumidityImage from '@shared/assets/images/partlycloudy.webp';
import moderateHumidityImage from '@shared/assets/images/moderaterain.webp';
import highHumidityImage from '@shared/assets/images/moderaterain.webp';
import veryHighHumidityImage from '@shared/assets/images/moderaterain.webp';
import extremeHumidityImage from '@shared/assets/images/heavyrain.webp';

const getHumidityImage = (humidity: number) => {
  if (humidity >= 0 && humidity <= 16) {
    return lowHumidityImage;
  } else if (humidity >= 17 && humidity <= 33) {
    return moderateLowHumidityImage;
  } else if (humidity >= 34 && humidity <= 50) {
    return moderateHumidityImage;
  } else if (humidity >= 51 && humidity <= 66) {
    return highHumidityImage;
  } else if (humidity >= 67 && humidity <= 83) {
    return veryHighHumidityImage;
  } else if (humidity >= 84 && humidity <= 100) {
    return extremeHumidityImage;
  } else {
    return lowHumidityImage;
  }
};

export const HumidityImage = ({humidity}: {humidity: number}) => {
  const humidityImage = getHumidityImage(humidity);

  return (
    <View style={styles.container}>
      <Image source={humidityImage} style={styles.image} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
  },
});
