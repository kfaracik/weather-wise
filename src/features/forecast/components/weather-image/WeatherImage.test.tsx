import React from 'react';
import {render} from '@testing-library/react-native';
import {WeatherImage} from './WeatherImage';

describe('WeatherImage', () => {
  it('should generate snapshot', () => {
    const {toJSON} = render(
      <WeatherImage weather={[{main: 'Clouds', description: 'moderate'}]} />,
    );
    expect(toJSON()).toMatchSnapshot();
  });
});
