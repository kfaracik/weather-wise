import React from 'react';
import { StyleSheet, View } from 'react-native';
import { DataTable, Text } from 'react-native-paper';
import { BaseWeatherData } from '../../api/types';

type HourlyForecastProps = {
  hourlyData: BaseWeatherData[];
};

export const HourlyForecast = ({ hourlyData }: HourlyForecastProps) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Hourly Forecast</Text>
      <DataTable>
        <DataTable.Header>
          <DataTable.Title>Time</DataTable.Title>
          <DataTable.Title>Temp</DataTable.Title>
          <DataTable.Title>Description</DataTable.Title>
        </DataTable.Header>
        {hourlyData.map((item) => (
          <DataTable.Row key={item.dt}>
            <DataTable.Cell>
              {new Date(item.dt * 1000).toLocaleTimeString([], {
                hour: '2-digit',
                minute: '2-digit',
              })}
            </DataTable.Cell>
            <DataTable.Cell>{item.main.temp}°C</DataTable.Cell>
            <DataTable.Cell>{item.weather[0].description}</DataTable.Cell>
          </DataTable.Row>
        ))}
      </DataTable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 16,
    padding: 16,
    borderRadius: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },
});
