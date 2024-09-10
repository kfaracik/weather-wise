import {apiKey, baseUrl} from '../../../api';

export type Forecast = {
  lat: number;
  lon: number;
};

export type GetLocation = {
  cityName: string;
  limit?: number;
};

export const forecastEndpoint = ({lat, lon}: Forecast) =>
  `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`;

export const getLocationEndpoint = ({cityName, limit = 5}: GetLocation) =>
  `${baseUrl}/geo/1.0/direct?q=${cityName}&limit=${limit}&appid=${apiKey}`;
