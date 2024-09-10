import {apiCall} from './api';
import {
  forecastEndpoint,
  type Forecast,
  getLocationEndpoint,
  type GetLocation,
} from './endpoints';

export type CityName = string;

export type Location = {
  country: string;
  lat: number;
  lon: number;
  name: string;
  state?: string;
  local_names?: Record<string, string>;
};

export type WeatherResponse = {
  coord: {
    lon: number;
    lat: number;
  };
  weather: {
    id: number;
    main: string;
    description: string;
    icon: string;
  }[];
  main: {
    temp: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    humidity: number;
  };
  visibility: number;
  wind: {
    speed: number;
  };
  clouds: {
    all: number;
  };
  dt: number;
  sys: {
    country: string;
    sunrise: number;
    sunset: number;
  };
  timezone: number;
  id: number;
  name: string;
  cod: number;
};

export const fetchLocation = async (
  params: GetLocation,
): Promise<Location[]> => {
  const response = await apiCall(getLocationEndpoint(params));
  return response as Location[];
};

export const fetchWeatherForecast = async (
  params: Forecast,
): Promise<WeatherResponse> => {
  const response = await apiCall(forecastEndpoint(params));
  return response as WeatherResponse;
};
