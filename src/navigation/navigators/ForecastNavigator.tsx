import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Screens} from '../constants';
import {
  LocationSearchScreen,
  LocationsForecastDetailsScreen,
  type LocationCord,
} from '@features/forecast';

export type ForecastStackParamList = {
  [Screens.LocationForecast]: undefined;
  [Screens.LocationForecastDetails]: {locationCord: LocationCord};
};

const Stack = createNativeStackNavigator<ForecastStackParamList>();

export const ForecastNavigator = () => {
  return (
    <Stack.Navigator initialRouteName={Screens.LocationForecast}>
      <Stack.Screen
        name={Screens.LocationForecast}
        component={LocationSearchScreen}
        options={{title: 'Forecast'}}
      />
      <Stack.Screen
        name={Screens.LocationForecastDetails}
        component={LocationsForecastDetailsScreen}
        options={{title: 'Location Details'}}
      />
    </Stack.Navigator>
  );
};