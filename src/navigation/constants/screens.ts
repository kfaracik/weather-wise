export enum BottomTab {
  ForecastTab = 'ForecastTab',
  FavoriteTab = 'FavoriteTab',
}

export enum Forecast {
    LocationForecast = 'LocationForecast',
    LocationForecastDetails = 'LocationForecastDetails',
  }

  export enum Favorite {
    FavoriteLocations = 'FavoriteLocations',
    LocationForecastDetails = 'LocationForecastDetails',
  }
  
  export const Screens = {
    ...BottomTab,
    ...Forecast,
    ...Favorite,
  };
  
  export type Screens = typeof Screens;
  