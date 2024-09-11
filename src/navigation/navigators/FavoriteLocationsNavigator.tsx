import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Screens} from '../constants';
import {
  LocationCord,
  LocationsForecastDetailsScreen,
  FavoriteLocationsScreen,
} from '@features/forecast';

export type ForecastStackParamList = {
  [Screens.FavoriteLocations]: undefined;
  [Screens.LocationForecastDetails]: {locationCord: LocationCord};
};

const Stack = createNativeStackNavigator<ForecastStackParamList>();

export const FavoriteLocationsNavigator = () => {
  return (
    <Stack.Navigator initialRouteName={Screens.FavoriteLocations}>
      <Stack.Screen
        name={Screens.FavoriteLocations}
        component={FavoriteLocationsScreen}
        options={{title: 'Favorite Locations', headerShown: false}}
      />
      <Stack.Screen
        name={Screens.LocationForecastDetails}
        component={LocationsForecastDetailsScreen}
        options={{title: 'Location Details'}}
      />
    </Stack.Navigator>
  );
};
