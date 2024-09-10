import {apiCall} from './api';
import {
  currentWeatherEndpoint,
  getLocationEndpoint,
  forecastEndpoint,
} from './endpoints';
import type { CityName, CurrentWeatherResponse, Location, LocationCord, WeatherForecastResponse } from './types';

export const fetchLocation = async (
  params: CityName,
): Promise<Location[]> => {
  const response = await apiCall(getLocationEndpoint(params));
  return response as Location[];
};

export const fetchCurrentWeather = async (
  params: LocationCord,
): Promise<CurrentWeatherResponse> => {
  const response = await apiCall(currentWeatherEndpoint(params));
  return response as CurrentWeatherResponse;
};

export const fetchWeatherForecast = async (
  params: LocationCord,
): Promise<WeatherForecastResponse> => {
  const response = await apiCall(forecastEndpoint(params));
  return response as WeatherForecastResponse;
};
