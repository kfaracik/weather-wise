import React from 'react';
import {render, fireEvent, waitFor} from '@testing-library/react-native';
import {DetailItem} from './DetailItem';

describe('LocationSearchScreen', () => {
  it('should generate snapshot', () => {
    const {toJSON} = render(<DetailItem iconSource='img_source' label={'abc123!@#'} />);
    expect(toJSON()).toMatchSnapshot();
  });
});
