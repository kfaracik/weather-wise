import AsyncStorage from '@react-native-async-storage/async-storage';
import {LocationCord} from '../api';

export type City = LocationCord & {
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
    const exists = favorites.some(
      fav => fav.lat === city.lat && fav.lon === city.lon,
    );
    if (!exists) {
      const updatedFavorites = [...favorites, city];
      await AsyncStorage.setItem(
        FAVORITES_KEY,
        JSON.stringify(updatedFavorites),
      );
    }
  } catch (error) {
    console.error('Error adding favorite:', error);
  }
};

export const removeFavorite = async (city: City): Promise<void> => {
  try {
    const favorites = await getFavorites();
    const updatedFavorites = favorites.filter(
      fav => fav.lat !== city.lat || fav.lon !== city.lon,
    );
    await AsyncStorage.setItem(FAVORITES_KEY, JSON.stringify(updatedFavorites));
  } catch (error) {
    console.error('Error removing favorite:', error);
  }
};

export const isFavorite = async (city: City): Promise<boolean> => {
  try {
    const favorites = await getFavorites();
    return favorites.some(fav => fav.lat === city.lat && fav.lon === city.lon);
  } catch (error) {
    console.error('Error checking favorite status:', error);
    return false;
  }
};
