import React from 'react';
import {render} from '@testing-library/react-native';
import {WeatherDetails} from './WeatherDetails';

describe('WeatherDetails', () => {
  it('should generate snapshot', () => {
    const {toJSON} = render(
      <WeatherDetails
        data={{
          dt: 0,
          main: {
            temp: 40,
            feels_like: undefined,
            temp_min: 40,
            temp_max: 30,
            pressure: 20,
            humidity: 10,
            sea_level: undefined,
            grnd_level: undefined,
            temp_kf: undefined,
          },
          weather: [],
          clouds: {
            all: 60,
          },
          wind: {
            speed: 20,
            deg: undefined,
            gust: undefined,
          },
          visibility: 30,
          pop: undefined,
          rain: undefined,
          snow: undefined,
          sys: {
            country: 'PL',
            sunrise: undefined,
            sunset: undefined,
            pod: undefined,
          },
          dt_txt: undefined,
        }}
      />,
    );
    expect(toJSON()).toMatchSnapshot();
  });
});
