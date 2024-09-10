import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {ForecastNavigator} from './src/navigation/ForecastNavigator';

const App = () => {
  return (
    <NavigationContainer>
      <ForecastNavigator />
    </NavigationContainer>
  );
};

export default App;
