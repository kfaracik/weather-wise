import React, {useEffect, useState} from 'react';
import {FlatList, StyleSheet, View, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {City, getFavorites, removeFavorite} from '../store';
import {Screens} from '@navigation/constants';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {type ForecastStackParamList} from '../../../navigation/navigators/ForecastNavigator';
import {AnimatedViewBasic, ScreenContainer} from '@shared/components';
import {Button, Text} from 'react-native-paper';

type FavoritesListNavigationProp = NativeStackNavigationProp<
  ForecastStackParamList,
  Screens['LocationForecastDetails']
>;

export const FavoriteLocationsScreen = () => {
  const [favorites, setFavorites] = useState<City[]>([]);
  const {navigate} = useNavigation<FavoritesListNavigationProp>();

  useEffect(() => {
    const fetchFavorites = async () => {
      const storedFavorites = await getFavorites();
      setFavorites(storedFavorites);
    };
    fetchFavorites();
  }, []);

  const handlePress = async ({lat, lon}: City) => {
    const locationCord = {lat, lon};
    navigate(Screens.LocationForecastDetails, {
      locationCord,
    });
  };

  const handleRemove = async (city: City) => {
    try {
      await removeFavorite(city);
      setFavorites(prevFavorites =>
        prevFavorites.filter(fav => fav.name !== city.name),
      );
    } catch (error) {
      console.error('Error removing favorite:', error);
    }
  };

  const renderItem = ({item}: {item: City}) => (
    <AnimatedViewBasic style={styles.itemContainer}>
      <TouchableOpacity style={styles.item} onPress={() => handlePress(item)}>
        <Text style={styles.text}>{item.name}</Text>
      </TouchableOpacity>
      <Button mode="text" onPress={() => handleRemove(item)}>
        Remove
      </Button>
    </AnimatedViewBasic>
  );

  return (
    <ScreenContainer>
      <View style={styles.container}>
        <Text style={styles.title}>Favorite Locations</Text>
        <FlatList
          data={favorites}
          renderItem={renderItem}
          keyExtractor={item => item.name}
          ListEmptyComponent={
            <Text style={styles.emptyText}>No favorites yet</Text>
          }
        />
      </View>
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 16,
    padding: 16,
    borderRadius: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  itemContainer: {
    gap: 8,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    borderRadius: 8,
    backgroundColor: 'rgba(128, 128, 128, 0.25)',
    elevation: 0,
  },
  item: {
    flex: 1,
    padding: 16,
    borderRadius: 8,
  },
  text: {
    fontSize: 18,
  },
  emptyText: {
    fontSize: 16,
    textAlign: 'center',
    marginTop: 20,
  },
});
