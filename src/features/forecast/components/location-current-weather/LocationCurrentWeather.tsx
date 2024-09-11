import React, {useEffect, useState} from 'react';
import {Image, StyleSheet, View, Alert} from 'react-native';
import {Button, Card, Text} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {CurrentWeatherResponse} from '../../api';
import {Screens} from '@navigation/constants';
import {WeatherImage} from '../weather-image';
import {addFavorite, removeFavorite, isFavorite} from '../../store';
import {ForecastStackParamList} from '../../../../navigation/navigators/ForecastNavigator';
import {AnimatedViewBasic} from '@shared/components';
import {formatTime} from '../../utlis';
import windIconSource from '@shared/assets/icons/wind.webp';
import dropIconSource from '@shared/assets/icons/drop.webp';
import sunIconSource from '@shared/assets/icons/sun.webp';
import {DetailItem} from '../detail-item';

type LocationCurrentWeatherProps = {
  name: CurrentWeatherResponse['name'];
  country: CurrentWeatherResponse['sys']['country'];
  lon: number;
  lat: number;
  humidity: number;
  temp: number;
  wind: number;
  sunset?: number;
  weather: CurrentWeatherResponse['weather'];
  disableNavigateToDetails?: boolean;
};

type LocationForecastNavProps = NativeStackNavigationProp<
  ForecastStackParamList,
  Screens['LocationForecastDetails']
>;

export const LocationCurrentWeather = ({
  name,
  country,
  lon,
  lat,
  humidity,
  temp,
  wind,
  sunset,
  weather,
  disableNavigateToDetails = false,
}: LocationCurrentWeatherProps) => {
  const {navigate} = useNavigation<LocationForecastNavProps>();
  const [isInFavorites, setIsInFavorites] = useState(false);

  useEffect(() => {
    const checkIfFavorite = async () => {
      try {
        const favorite = await isFavorite({lat, lon, name});
        setIsInFavorites(favorite);
      } catch (error) {
        console.error('Error checking if favorite:', error);
      }
    };

    checkIfFavorite();
  }, [lat, lon, name]);

  const navigateToDetails = () => {
    const locationCord = {lat, lon};
    navigate(Screens.LocationForecastDetails, {locationCord});
  };

  const handleAddOrRemoveFavorite = async () => {
    const city = {lat, lon, name};
    try {
      const isFav = await isFavorite(city);
      if (isFav) {
        await removeFavorite(city);
        setIsInFavorites(false);
      } else {
        await addFavorite(city);
        setIsInFavorites(true);
      }
    } catch (error) {
      console.error('Error handling favorite:', error);
    }
  };

  return (
    <AnimatedViewBasic>
      <Card style={styles.card}>
        <Card.Content style={styles.container}>
          <View style={styles.titleContainer}>
            <Text style={styles.locationNameText}>{name},</Text>
            <Text>{country}</Text>
          </View>
          <WeatherImage weather={weather} />
          <Text style={styles.temperatureText}>{Math.round(temp)}&#176;C</Text>
          <Text>{weather[0].description}</Text>
          <View style={styles.detailsContainer}>
            <DetailItem
              iconSource={windIconSource}
              label={`${Math.round(wind)} km/h`}
            />
            <DetailItem iconSource={dropIconSource} label={`${humidity} %`} />
            {sunset && (
              <DetailItem
                iconSource={sunIconSource}
                label={formatTime(sunset)}
              />
            )}
          </View>
          <View style={styles.buttonContainer}>
            {disableNavigateToDetails ? null : (
              <Button
                mode="outlined"
                textColor="lightgray"
                onPress={navigateToDetails}
                style={styles.button}>
                Go to details
              </Button>
            )}
            <Button
              mode="outlined"
              textColor="lightgray"
              onPress={handleAddOrRemoveFavorite}
              style={styles.button}>
              {isInFavorites ? 'Remove from favorite' : 'Add to favorite'}
            </Button>
          </View>
        </Card.Content>
      </Card>
    </AnimatedViewBasic>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    elevation: 0,
    shadowColor: 'transparent',
  },
  container: {
    gap: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleContainer: {
    gap: 16,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  locationNameText: {
    fontSize: 24,
    fontWeight: '700',
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
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  button: {
    flex: 1,
    marginHorizontal: 4,
    borderColor: 'lightgray',
    backgroundColor: 'gray',
  },
});
