import React from 'react';
import {render} from '@testing-library/react-native';
import {FavoriteLocationsScreen} from './FavoriteLocationsScreen';

describe('FavoriteLocationsScreen', () => {
  it('should generate snapshot', () => {
    const {toJSON} = render(<FavoriteLocationsScreen />);
    expect(toJSON()).toMatchSnapshot();
  });
});
