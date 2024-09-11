import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Screens} from '../constants';
import {ForecastNavigator} from './ForecastNavigator';
import {FavoriteLocationsNavigator} from './FavoriteLocationsNavigator';

const Tab = createBottomTabNavigator();

export const BottomTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: 'black',
        tabBarInactiveTintColor: 'gray',
        tabBarLabelStyle: {
          fontSize: 16,
          fontWeight: 'bold',
        },
        tabBarStyle: {
          height: 70,
          backgroundColor: '#aaa',
        },
      }}>
      <Tab.Screen
        name={Screens.ForecastTab}
        component={ForecastNavigator}
        options={{
          title: 'Forecast',
        }}
      />
      <Tab.Screen
        name={Screens.FavoriteTab}
        component={FavoriteLocationsNavigator}
        options={{title: 'Favorite'}}
      />
    </Tab.Navigator>
  );
};
