import React from 'react';
import {render} from '@testing-library/react-native';
import {HourlyForecast} from './HourlyForecast';
import {BaseWeatherData} from '../../api/types';

const mockHourlyData: BaseWeatherData[] = [
  {
    dt: 1628167200,
    main: {
      temp: 25.6,
      feels_like: 26.0,
      temp_min: 25.0,
      temp_max: 26.5,
      pressure: 1013,
      humidity: 78,
      sea_level: 1013,
      grnd_level: 1000,
      temp_kf: undefined,
    },
    weather: [
      {
        id: 800,
        main: 'Clear',
        description: 'clear sky',
        icon: '01d',
      },
    ],
    clouds: {
      all: 10,
    },
    wind: {
      speed: 5.1,
      deg: 250,
      gust: 7.0,
    },
    visibility: 10000,
    sys: {
      pod: 'd',
      country: 'PL',
    },
  },
];

describe('LocationSearchScreen', () => {
  it('should generate snapshot', () => {
    const {toJSON} = render(<HourlyForecast hourlyData={mockHourlyData} />);
    expect(toJSON()).toMatchSnapshot();
  });
});
