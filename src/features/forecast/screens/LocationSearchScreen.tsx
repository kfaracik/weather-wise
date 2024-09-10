import React, {useCallback, useState} from 'react';
import {
  ActivityIndicator,
  ImageBackground,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
} from 'react-native';
import backgroundImageSource from '@shared/assets/images/bg.webp';
import {Divider, TextInput, TouchableRipple} from 'react-native-paper';
import {LocationForecast} from '../components';
import {debounce} from 'lodash';
import {
  type CityName,
  fetchLocation,
  fetchWeatherForecast,
  Location,
} from '../api';
import {WeatherResponse} from '../api/forecastService';

export const LocationSearchScreen = () => {
  const [locations, setLocations] = useState<Location[]>([]);
  const [inputFocus, setInputFocus] = useState(false);
  const [inputTextValue, setInputTextValue] = useState('');
  const [selectedLocationForecast, setSelectedLocationForecast] =
    useState<WeatherResponse>();
  const [loading, setLoading] = useState(false);

  const handleLocation = async (location: Location) => {
    setLoading(true);
    try {
      const data = await fetchWeatherForecast({
        lat: location.lat,
        lon: location.lon,
      });
      setSelectedLocationForecast(data);
    } catch (error) {
      console.error('Error fetching weather forecast:', error);
    } finally {
      setLoading(false);
    }
    setInputFocus(false);
    setInputTextValue('');
    Keyboard.dismiss();
  };

  const handleLocationSearch = async (cityName: CityName) => {
    setLoading(true);
    try {
      const data = await fetchLocation({cityName});
      setLocations(data);
    } catch (error) {
      console.error('Error fetching location data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleTextDebounce = useCallback(
    debounce(handleLocationSearch, 1500),
    [],
  );

  const onChangeText = (cityName: CityName) => {
    handleTextDebounce(cityName);
    setInputTextValue(cityName);
  };

  return (
    <ImageBackground
      blurRadius={16}
      source={backgroundImageSource}
      style={styles.backgroundImage}>
      <SafeAreaView style={styles.safeArea}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.container}>
          <View style={styles.contentContainer}>
            <View style={styles.searchContainer}>
              <TextInput
                mode="outlined"
                placeholder="Search city"
                value={inputTextValue}
                outlineStyle={styles.searchInput}
                onChangeText={onChangeText}
                onFocus={() => setInputFocus(true)}
                onBlur={() => setInputFocus(false)}
                style={styles.textInput}
              />
              {loading ? (
                <ActivityIndicator size="large" color="#0000ff" />
              ) : locations?.length > 0 && inputFocus ? (
                <View style={styles.resultsContainer}>
                  {locations.map((location, id) => (
                    <View key={id}>
                      <TouchableRipple
                        style={styles.itemStyle}
                        onPress={() => handleLocation(location)}>
                        <Text style={styles.text}>
                          {location.name}, {location.state}
                        </Text>
                      </TouchableRipple>
                      {id < locations?.length - 1 && <Divider />}
                    </View>
                  ))}
                </View>
              ) : null}
            </View>
            {selectedLocationForecast ? (
              <LocationForecast locationForecast={selectedLocationForecast} />
            ) : !loading ? (
              <Text style={styles.text}>Check the weather for a city</Text>
            ) : null}
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },
  safeArea: {
    flex: 1,
    width: '100%',
  },
  container: {
    flex: 1,
  },
  text: {
    fontSize: 16,
  },
  contentContainer: {
    flex: 1,
    margin: 8,
    gap: 16,
    alignItems: 'center',
  },
  searchContainer: {
    zIndex: 1,
    width: '100%',
  },
  searchInput: {
    borderRadius: 16,
  },
  textInput: {
    opacity: 0.7,
  },
  resultsContainer: {
    marginTop: 4,
    borderRadius: 16,
    backgroundColor: 'white',
  },
  itemStyle: {
    flexDirection: 'row',
    paddingHorizontal: 8,
    paddingVertical: 8,
  },
});
