  export enum Forecast {
    LocationForecast = 'LocationForecast',
    LocationForecastDetails = 'LocationForecastDetails',
  }
  
  export const Screens = {
    ...Forecast,
  };
  
  export type Screens = typeof Screens;
  