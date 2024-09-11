import React from 'react';
import {render} from '@testing-library/react-native';
import {LocationSearchScreen} from './LocationSearchScreen';

jest.mock('../api', () => ({
  fetchLocation: jest.fn(),
  fetchCurrentWeather: jest.fn(),
}));

describe('LocationSearchScreen', () => {
  it('should generate snapshot', () => {
    const {toJSON} = render(<LocationSearchScreen />);
    expect(toJSON()).toMatchSnapshot();
  });

  it('should render search input and placeholder correctly', () => {
    const {getByPlaceholderText} = render(<LocationSearchScreen />);
    const searchInput = getByPlaceholderText('Search city');
    expect(searchInput).toBeTruthy();
  });

  it('should show "Check the weather for a city" text when no location is selected', () => {
    const {getByText} = render(<LocationSearchScreen />);
    const emptyText = getByText('Check the weather for a city');
    expect(emptyText).toBeTruthy();
  });
});
