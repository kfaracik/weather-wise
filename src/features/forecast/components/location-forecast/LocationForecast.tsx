import React from 'react';
import {Image, StyleSheet, View} from 'react-native';
import partlycloudyTmp from '@shared/assets/images/partlycloudy.webp';
import windIconSource from '@shared/assets/icons/wind.webp';
import dropIconSource from '@shared/assets/icons/drop.webp';
import sunIconSource from '@shared/assets/icons/sun.webp';
import {Button, Text} from 'react-native-paper';
import {WeatherResponse} from '../../api/forecastService';
import {useNavigation} from '@react-navigation/native';
import {Screens} from '@navigation/constants';

type LocationForecastProps = {
  locationForecast: WeatherResponse;
};

export const LocationForecast = ({locationForecast}: LocationForecastProps) => {
  const {name: cityName, sys, main, wind, weather, coord} = locationForecast;

  const navigation = useNavigation();

  const navigateToDetails = () => {};

  const formatTime = (timestamp: number) => {
    const date = new Date(timestamp * 1000);
    const hours = date.getHours();
    const minutes = date.getMinutes();
    return `${hours}:${minutes < 10 ? '0' : ''}${minutes}`;
  };

  const addLocationToFavorite = () => {
    const city = {
      lat: coord.lat,
      lon: coord.lon,
      name: cityName,
    };
  };

  return (
    <View style={styles.container}>
      <Text style={styles.locationNameText}>{cityName},</Text>
      <Text>{sys.country}</Text>

      <Image source={partlycloudyTmp} style={styles.forecastImage} />
      <Text style={styles.temperatureText}>{Math.round(main.temp)}&#176;C</Text>
      <Text>{weather[0].description}</Text>

      <View style={styles.detailsContainer}>
        <View style={styles.detailItem}>
          <Image source={windIconSource} style={styles.icon} />
          <Text>{Math.round(wind.speed)} km/h</Text>
        </View>
        <View style={styles.detailItem}>
          <Image source={dropIconSource} style={styles.icon} />
          <Text>{main.humidity} %</Text>
        </View>
        <View style={styles.detailItem}>
          <Image source={sunIconSource} style={styles.icon} />
          <Text>{sys && formatTime(sys.sunset)}</Text>
        </View>
      </View>
      <Button mode="outlined" onPress={navigateToDetails}>
        Go to details
      </Button>
      <Button mode="outlined" onPress={addLocationToFavorite}>
        Add to favorite
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  forecastImage: {
    marginVertical: 32,
    width: 200,
    height: 200,
    resizeMode: 'contain',
  },
  locationNameText: {
    fontSize: 24,
    fontWeight: 700,
  },
  temperatureText: {
    fontSize: 32,
    fontWeight: 700,
  },
  detailsContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  detailItem: {
    gap: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
  },
});
