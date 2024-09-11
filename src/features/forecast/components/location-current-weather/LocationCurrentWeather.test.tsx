import React from 'react';
import {render, fireEvent, waitFor} from '@testing-library/react-native';
import {LocationCurrentWeather} from './LocationCurrentWeather';

describe('LocationCurrentWeather', () => {
  it('should generate snapshot', () => {
    const {toJSON} = render(
      <LocationCurrentWeather
        name={'Krakow'}
        country={'PL'}
        lon={23.5456}
        lat={32.6556}
        humidity={90}
        temp={20}
        wind={50}
        weather={[
          {
            id: 1,
            main: 'Cloudy',
            description: 'little loudy',
            icon: 'oh2',
          },
        ]}
      />,
    );
    expect(toJSON()).toMatchSnapshot();
  });
});
