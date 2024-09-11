import React from 'react';
import Svg, {Circle, Line, Path} from 'react-native-svg';

export const WeatherIcon = ({size = 24, color = 'yellow'}) => (
  <Svg
    fill="none"
    height={size}
    width={size}
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke={color}>
    <Path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M12 3v2.25M18.364 5.636l-1.591 1.591M21 12h-2.25M18.364 18.364l-1.591-1.591M12 18.75V21M7.636 18.364l-1.591 1.591M5.25 12H3M7.636 5.636L6.045 7.227"
    />
    <Circle cx="12" cy="12" r="3.75" />
  </Svg>
);
