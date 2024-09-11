import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Screens} from '../constants';
import {ForecastNavigator} from './ForecastNavigator';
import {FavoriteLocationsNavigator} from './FavoriteLocationsNavigator';
import {HeartIcon, WeatherIcon} from '@shared/components';

const Tab = createBottomTabNavigator();

export const BottomTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: 'black',
        tabBarInactiveTintColor: 'gray',
      }}>
      <Tab.Screen
        name={Screens.ForecastTab}
        component={ForecastNavigator}
        options={{
          title: 'Forecast',
          tabBarIcon: ({color}) => {
            return <WeatherIcon color={color} />;
          },
        }}
      />
      <Tab.Screen
        name={Screens.FavoriteTab}
        component={FavoriteLocationsNavigator}
        options={{
          title: 'Favorite',
          tabBarIcon: ({color}) => {
            return <HeartIcon color={color} />;
          },
        }}
      />
    </Tab.Navigator>
  );
};
