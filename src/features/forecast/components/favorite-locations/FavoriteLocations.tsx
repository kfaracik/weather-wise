import React, {useEffect, useState} from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import {CompositeScreenProps, useNavigation} from '@react-navigation/native';
import {City, getFavorites} from '../../store';
import {Screens} from '@navigation/constants';
import {fetchWeatherForecast, type WeatherResponse} from '../../api';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import { type ForecastStackParamList } from '../../../../navigation/ForecastNavigator';

const {height: screenHeight} = Dimensions.get('window');

type FavoritesListNavigationProp = NativeStackScreenProps<
  ForecastStackParamList,
  Screens["LocationForecastDetails"]
>['navigation'];

export const FavoritesList = () => {
  const [favorites, setFavorites] = useState<City[]>([]);
  const navigation = useNavigation<FavoritesListNavigationProp>();

  useEffect(() => {
    const fetchFavorites = async () => {
      const storedFavorites = await getFavorites();
      setFavorites(storedFavorites);
    };
    fetchFavorites();
  }, []);

  const handlePress = async (city: City) => {
    try {
      const locationForecast: WeatherResponse = await fetchWeatherForecast({
        lat: city.lat,
        lon: city.lon,
      });

    //   console.log({data});

      navigation.navigate(Screens.LocationForecastDetails, {
        locationForecast,
      });
    } catch (error) {
      console.error('Error fetching weather forecast:', error);
    } finally {
    }
  };

  const renderItem = ({item}: {item: City}) => (
    <TouchableOpacity style={styles.item} onPress={() => handlePress(item)}>
      <Text style={styles.text}>{item.name}</Text>
    </TouchableOpacity>
  );

  return (
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
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    maxHeight: screenHeight * 0.5,
    padding: 16,
    borderRadius: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.4)',
    width: '100%',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  item: {
    padding: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.4)',
    marginBottom: 8,
    borderRadius: 8,
    shadowRadius: 4,
    elevation: 1,
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
