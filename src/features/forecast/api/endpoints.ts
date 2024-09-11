import {apiKey, baseUrl} from '@api';
import type { CityName, LocationCord } from './types';

export const forecastEndpoint = ({lat, lon}: LocationCord) =>
  `${baseUrl}/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

export const currentWeatherEndpoint = ({lat, lon}: LocationCord) =>
  `${baseUrl}/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

export const getLocationEndpoint = ({cityName}: CityName) =>
  `${baseUrl}/geo/1.0/direct?q=${cityName}&appid=${apiKey}`;
