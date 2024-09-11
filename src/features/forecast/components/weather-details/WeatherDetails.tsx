import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Text} from 'react-native-paper';
import {BaseWeatherData} from '../../api/types';

type WeatherDetailsProps = {
  data: BaseWeatherData;
};

export const WeatherDetails = ({data}: WeatherDetailsProps) => (
  <View style={styles.container}>
    <Text style={styles.title}>Weather Details</Text>
    <Text style={styles.detail}>Humidity: {data.main.humidity}%</Text>
    <Text style={styles.detail}>Pressure: {data.main.pressure} hPa</Text>
    <Text style={styles.detail}>Wind Speed: {data.wind.speed} m/s</Text>
    <Text style={styles.detail}>Cloudiness: {data.clouds.all}%</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    marginTop: 16,
    marginBottom: 32,
    padding: 16,
    borderRadius: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  detail: {
    fontSize: 16,
    marginBottom: 4,
  },
});
