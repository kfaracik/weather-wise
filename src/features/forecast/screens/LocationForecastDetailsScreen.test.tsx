import React from 'react';
import {render} from '@testing-library/react-native';
import {LocationForecastDetailsScreen} from './LocationForecastDetailsScreen';

describe('FavoriteLocationsScreen', () => {
  it('should generate snapshot', () => {
    const {toJSON} = render(<LocationForecastDetailsScreen />);
    expect(toJSON()).toMatchSnapshot();
  });
});
