import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  getFavorites,
  addFavorite,
  removeFavorite,
  isFavorite,
  City,
} from './favoriteLocationsStorage';

jest.mock('@react-native-async-storage/async-storage');

const mockCity: City = {
  lat: 52.2297,
  lon: 21.0122,
  name: 'Warsaw',
};

const mockFavorites: City[] = [
  {lat: 40.7128, lon: -74.006, name: 'New York'},
  {lat: 34.0522, lon: -118.2437, name: 'Los Angeles'},
];

describe('Favorites management', () => {
  beforeEach(() => {
    AsyncStorage.getItem.mockClear();
    AsyncStorage.setItem.mockClear();
  });

  it('should return an empty array if no favorites are stored', async () => {
    AsyncStorage.getItem.mockResolvedValueOnce(null);
    const favorites = await getFavorites();
    expect(favorites).toEqual([]);
  });

  it('should return stored favorites', async () => {
    AsyncStorage.getItem.mockResolvedValueOnce(JSON.stringify(mockFavorites));
    const favorites = await getFavorites();
    expect(favorites).toEqual(mockFavorites);
  });

  it('should add a city to favorites if it does not exist', async () => {
    AsyncStorage.getItem.mockResolvedValueOnce(JSON.stringify(mockFavorites));
    await addFavorite(mockCity);
    const updatedFavorites = [...mockFavorites, mockCity];
    expect(AsyncStorage.setItem).toHaveBeenCalledWith(
      'favorites',
      JSON.stringify(updatedFavorites),
    );
  });

  it('should not add a city to favorites if it already exists', async () => {
    AsyncStorage.getItem.mockResolvedValueOnce(
      JSON.stringify([...mockFavorites, mockCity]),
    );
    await addFavorite(mockCity);
    expect(AsyncStorage.setItem).not.toHaveBeenCalled();
  });

  it('should remove a city from favorites', async () => {
    AsyncStorage.getItem.mockResolvedValueOnce(
      JSON.stringify([...mockFavorites, mockCity]),
    );
    await removeFavorite(mockCity);
    const updatedFavorites = mockFavorites;
    expect(AsyncStorage.setItem).toHaveBeenCalledWith(
      'favorites',
      JSON.stringify(updatedFavorites),
    );
  });

  it('should return true if the city is a favorite', async () => {
    AsyncStorage.getItem.mockResolvedValueOnce(
      JSON.stringify([...mockFavorites, mockCity]),
    );
    const result = await isFavorite(mockCity);
    expect(result).toBe(true);
  });

  it('should return false if the city is not a favorite', async () => {
    AsyncStorage.getItem.mockResolvedValueOnce(JSON.stringify(mockFavorites));
    const result = await isFavorite(mockCity);
    expect(result).toBe(false);
  });
});
