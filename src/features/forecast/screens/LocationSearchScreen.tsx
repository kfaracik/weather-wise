import React, {useCallback, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Keyboard,
  TouchableWithoutFeedback,
} from 'react-native';
import {Divider, TextInput, TouchableRipple} from 'react-native-paper';
import {LoaderItem, LocationCurrentWeather} from '../components';
import {debounce} from 'lodash';
import {
  fetchLocation,
  fetchCurrentWeather,
  type Location,
  type CurrentWeatherResponse,
} from '../api';
import {ScreenContainer} from '@shared/components';

export const LocationSearchScreen = () => {
  const [locations, setLocations] = useState<Location[]>([]);
  const [inputFocus, setInputFocus] = useState(false);
  const [inputTextValue, setInputTextValue] = useState('');
  const [selectedLocationForecast, setSelectedLocationForecast] =
    useState<CurrentWeatherResponse>();
  const [loading, setLoading] = useState(false);

  const handleLocation = async (location: Location) => {
    setLoading(true);
    try {
      const data = await fetchCurrentWeather({
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

  const handleLocationSearch = async (cityName: string) => {
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

  const onChangeText = (cityName: string) => {
    handleTextDebounce(cityName);
    setInputTextValue(cityName);
  };

  return (
    <ScreenContainer>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
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
            {loading && inputTextValue.length > 0 ? (
              <View style={styles.resultsContainer}>
                <LoaderItem />
              </View>
            ) : locations.length > 0 && inputFocus ? (
              <View style={styles.resultsContainer}>
                {locations.map((location, id) => (
                  <View key={id}>
                    <TouchableRipple
                      style={styles.itemStyle}
                      onPress={() => handleLocation(location)}>
                      <Text style={styles.text}>
                        {location.name}, {location.state}, {location.country}
                      </Text>
                    </TouchableRipple>
                    {id < locations.length - 1 && <Divider />}
                  </View>
                ))}
              </View>
            ) : null}
          </View>
          {selectedLocationForecast ? (
            <LocationCurrentWeather
              locationForecast={selectedLocationForecast}
            />
          ) : !loading ? (
            <Text style={styles.emptyScreenText}>
              Check the weather for a city
            </Text>
          ) : null}
        </View>
      </TouchableWithoutFeedback>
    </ScreenContainer>
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
  emptyScreenText: {
    fontSize: 16,
    color: 'lightgray',
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
