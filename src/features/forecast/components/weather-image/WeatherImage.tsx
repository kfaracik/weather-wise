import React from 'react';
import { Image, StyleSheet, View } from 'react-native';
import clearSkyImage from '@shared/assets/images/sun.webp';
import partlyCloudyImage from '@shared/assets/images/partlycloudy.webp';
import moderateRainImage from '@shared/assets/images/moderaterain.webp';
import mistImage from '@shared/assets/images/mist.webp';
import cloudyImage from '@shared/assets/images/cloud.webp';
import heavyRainImage from '@shared/assets/images/heavyrain.webp';

const getWeatherImage = (weatherMain: string, weatherDescription: string) => {
  if (weatherMain === 'Clear') {
    return clearSkyImage; 
  } else if (weatherMain === 'Clouds') {
    if (weatherDescription.includes('partly cloudy')) {
      return partlyCloudyImage;
    } else if (weatherDescription.includes('cloudy')) {
      return cloudyImage;
    }
    return partlyCloudyImage;
  } else if (weatherMain === 'Rain') {
    if (weatherDescription.includes('heavy')) {
      return heavyRainImage;
    } else if (weatherDescription.includes('moderate')) {
      return moderateRainImage;
    }
    return moderateRainImage;
  } else if (weatherMain === 'Mist' || weatherMain === 'Fog') {
    return mistImage;
  } else {
    return clearSkyImage;
  }
};

export const WeatherImage = ({
  weather,
}: {
  weather: { main: string; description: string }[];
}) => {
  const weatherCondition = weather[0];
  const weatherImage = getWeatherImage(
    weatherCondition.main,
    weatherCondition.description,
  );

  return (
    <View style={styles.container}>
      <Image source={weatherImage} style={styles.image} />
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
