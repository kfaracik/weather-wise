import React, {useEffect, useState} from 'react';
import {StyleSheet, ActivityIndicator, ScrollView} from 'react-native';
import {Text} from 'react-native-paper';
import {useNavigation, useRoute} from '@react-navigation/native';
import {fetchWeatherForecast} from '../api';
import {
  HourlyForecast,
  LocationCurrentWeather,
  WeatherDetails,
} from '../components';
import {AnimatedViewBasic, ScreenContainer} from '@shared/components';
import {WeatherForecastResponse, LocationCord} from '../api/types';

export const LocationForecastDetailsScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const [weatherData, setWeatherData] =
    useState<WeatherForecastResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const locationCord = route.params?.locationCord as LocationCord;

  useEffect(() => {
    const parent = navigation.getParent();
    parent?.setOptions({
      tabBarStyle: {display: 'none'},
    });

    const fetchData = async () => {
      try {
        const data = await fetchWeatherForecast(locationCord);
        setWeatherData(data);
      } catch (error) {
        console.error('Error fetching weather forecast:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    return () =>
      parent?.setOptions({
        tabBarStyle: undefined,
      });
  }, [navigation, locationCord]);

  return (
    <ScreenContainer style={styles.screenContainer}>
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}>
        {loading ? (
          <AnimatedViewBasic style={styles.container}>
            <ActivityIndicator size="large" />
          </AnimatedViewBasic>
        ) : (
          <AnimatedViewBasic>
            {weatherData ? (
              <>
                <LocationCurrentWeather
                  name={weatherData.city.name}
                  country={weatherData.city.country}
                  lon={weatherData.city.coord.lon}
                  lat={weatherData.city.coord.lat}
                  humidity={weatherData.list[0].main.humidity}
                  temp={weatherData.list[0].main.temp}
                  wind={weatherData.list[0].wind.speed}
                  sunset={weatherData.city.sunset}
                  weather={weatherData.list[0].weather}
                  disableNavigateToDetails
                />
                <HourlyForecast hourlyData={weatherData.list.slice(0, 8)} />
                <WeatherDetails data={weatherData.list[0]} />
              </>
            ) : (
              <Text>No forecast data</Text>
            )}
          </AnimatedViewBasic>
        )}
      </ScrollView>
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  screenContainer: {
    margin: 0,
  },
  scrollView: {
    padding: 8,
  },
});
