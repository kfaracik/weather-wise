export type LocationCord = {
  lat: number;
  lon: number;
};

export type CityName = {
  cityName: string;
};

export type Location = LocationCord & {
  country: string;
  name: string;
  state?: string;
};

export type WeatherCondition = {
  id: number;
  main: string;
  description: string;
  icon: string;
};

export type MainWeatherData = {
  temp: number;
  feels_like?: number;
  temp_min: number;
  temp_max: number;
  pressure: number;
  humidity: number;
  sea_level?: number;
  grnd_level?: number;
  temp_kf?: number;
};

export type Wind = {
  speed: number;
  deg?: number;
  gust?: number;
};

export type Clouds = {
  all: number;
};

export type SysInfo = {
  country: string;
  sunrise?: number;
  sunset?: number;
  pod?: string;
};

export type BaseWeatherData = {
  dt: number;
  main: MainWeatherData;
  weather: WeatherCondition[];
  clouds: Clouds;
  wind: Wind;
  visibility: number;
  pop?: number;
  rain?: {
    '3h': number;
  };
  snow?: {
    '3h': number;
  };
  sys: SysInfo;
  dt_txt?: string;
};

export type CurrentWeatherResponse = {
  coord: LocationCord;
  weather: WeatherCondition[];
  main: MainWeatherData;
  visibility: number;
  wind: Wind;
  clouds: Clouds;
  dt: number;
  sys: SysInfo;
  timezone: number;
  id: number;
  name: string;
  cod: number;
};

export type WeatherForecastResponse = {
  cod: string;
  message: number;
  cnt: number;
  list: BaseWeatherData[];
  city: {
    id: number;
    name: string;
    coord: LocationCord;
    country: string;
    population: number;
    timezone: number;
    sunrise: number;
    sunset: number;
  };
};
