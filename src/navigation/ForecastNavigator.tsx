import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Screens} from './constants';
import {LocationSearchScreen} from '@features/forecast';

type ForecastStackParamList = {
  [Screens.LocationForecast]: undefined;
};

const Stack = createNativeStackNavigator<ForecastStackParamList>();

export const ForecastNavigator = () => {
  return (
    <Stack.Navigator initialRouteName={Screens.LocationForecast}>
      <Stack.Screen
        name={Screens.LocationForecast}
        component={LocationSearchScreen}
      />
    </Stack.Navigator>
  );
};
