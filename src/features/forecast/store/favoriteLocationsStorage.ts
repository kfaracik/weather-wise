import AsyncStorage from '@react-native-async-storage/async-storage';

export type City = {
  lat: number;
  lon: number;
  name: string;
};

const FAVORITES_KEY = 'favorites';

export const getFavorites = async (): Promise<City[]> => {
  try {
    const favorites = await AsyncStorage.getItem(FAVORITES_KEY);
    return favorites ? JSON.parse(favorites) : [];
  } catch (error) {
    console.error('Error fetching favorites:', error);
    return [];
  }
};

export const addFavorite = async (city: City): Promise<void> => {
  try {
    const favorites = await getFavorites();
    if (!favorites.some(fav => fav.name === city.name)) {
      favorites.push(city);
      await AsyncStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
    }
  } catch (error) {
    console.error('Error adding favorite:', error);
  }
};

export const removeFavorite = async (cityName: string): Promise<void> => {
  try {
    const favorites = await getFavorites();
    const updatedFavorites = favorites.filter(fav => fav.name !== cityName);
    await AsyncStorage.setItem(FAVORITES_KEY, JSON.stringify(updatedFavorites));
  } catch (error) {
    console.error('Error removing favorite:', error);
  }
};
