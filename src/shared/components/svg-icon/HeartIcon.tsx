import React from 'react';
import Svg, {Path} from 'react-native-svg';

export const HeartIcon = ({size = 24, color = 'red'}) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M12 21.35L10.55 20.03C5.4 15.36 2 12.28 2 8.5C2 6.5 3.5 5 5.5 5C6.74 5 7.92 5.58 8.72 6.59C9.52 7.6 10.68 7.6 11.48 6.59C12.28 5.58 13.46 5 14.7 5C16.7 5 18.2 6.5 18.2 8.5C18.2 12.28 14.8 15.36 9.65 20.04L12 21.35Z"
      fill={color}
    />
  </Svg>
);
