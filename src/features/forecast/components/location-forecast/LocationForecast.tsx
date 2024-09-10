import React from 'react';
import {Image, StyleSheet, View, Alert} from 'react-native';
import windIconSource from '@shared/assets/icons/wind.webp';
import dropIconSource from '@shared/assets/icons/drop.webp';
import sunIconSource from '@shared/assets/icons/sun.webp';
import {Button, Card, Text} from 'react-native-paper';
import {WeatherResponse} from '../../api/forecastService';
import {useNavigation} from '@react-navigation/native';
import {Screens} from '@navigation/constants';
import {HumidityImage} from '../humidity-image';
import {addFavorite} from '../../store';
import {ForecastStackParamList} from '../../../../navigation/ForecastNavigator';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

type LocationForecastProps = {
  locationForecast: WeatherResponse;
};

type LocationForecastNavProps = NativeStackScreenProps<
  ForecastStackParamList,
  Screens['LocationForecastDetails']
>['navigation'];

export const LocationForecast = ({locationForecast}: LocationForecastProps) => {
  const {name: cityName, sys, main, wind, weather, coord} = locationForecast;

  const navigation = useNavigation<LocationForecastNavProps>();

  const navigateToDetails = () => {
    navigation.navigate(Screens.LocationForecastDetails, {locationForecast});
  };

  const formatTime = (timestamp: number) => {
    const date = new Date(timestamp * 1000);
    const hours = date.getHours();
    const minutes = date.getMinutes();
    return `${hours}:${minutes < 10 ? '0' : ''}${minutes}`;
  };

  const handleAddLocationToFavorite = async () => {
    const city = {
      lat: coord.lat,
      lon: coord.lon,
      name: cityName,
    };

    try {
      await addFavorite(city);
      Alert.alert('Success', `${cityName} added to favorites!`);
    } catch {
      Alert.alert('Error', 'Failed to add city to favorites.');
    }
  };

  return (
    <Card style={styles.card}>
      <Card.Title title={cityName} subtitle={sys.country} />
      <Card.Content style={styles.container}>
        <HumidityImage humidity={main.humidity} />

        <Text style={styles.temperatureText}>
          {Math.round(main.temp)}&#176;C
        </Text>
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
        <View style={styles.buttonContainer}>
          <Button
            mode="outlined"
            onPress={navigateToDetails}
            style={styles.button}>
            Go to details
          </Button>
          <Button
            mode="outlined"
            onPress={handleAddLocationToFavorite}
            style={styles.button}>
            Add to favorite
          </Button>
        </View>
      </Card.Content>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'rgba(255, 255, 255, 0.4)',
  },
  container: {
    gap: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  forecastImage: {
    marginVertical: 32,
    width: 100,
    height: 100,
    resizeMode: 'contain',
  },
  temperatureText: {
    fontSize: 32,
    fontWeight: 'bold',
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
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  button: {
    flex: 1,
    marginHorizontal: 4,
  },
});
