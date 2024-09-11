import React from 'react';
import {render} from '@testing-library/react-native';
import {LoaderItem} from './LoaderItem';

describe('LocationSearchScreen', () => {
  it('should generate snapshot', () => {
    const {toJSON} = render(<LoaderItem />);
    expect(toJSON()).toMatchSnapshot();
  });
});
