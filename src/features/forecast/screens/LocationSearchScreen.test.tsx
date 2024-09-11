import React from 'react';
import {render, fireEvent, waitFor} from '@testing-library/react-native';
import {LocationSearchScreen} from './LocationSearchScreen';

describe('LocationSearchScreen', () => {
  it('should generate snapshot', () => {
    const {toJSON} = render(<LocationSearchScreen />);
    expect(toJSON()).toMatchSnapshot();
  });
});
