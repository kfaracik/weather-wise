import React, {useEffect, useState} from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {City, getFavorites} from '../../store';
import {Screens} from '@navigation/constants';

const {height: screenHeight} = Dimensions.get('window');

export const FavoritesList = () => {
  const [favorites, setFavorites] = useState<City[]>([]);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchFavorites = async () => {
      const storedFavorites = await getFavorites();
      setFavorites(storedFavorites);
    };
    fetchFavorites();
  }, []);

  const handlePress = (city: City) => {

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
    maxHeight: screenHeight * 0.5, // Set the max height to 50% of screen height
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
