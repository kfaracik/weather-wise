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
    if (cityName.length === 0) {
      return;
    }

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
    debounce((cityName: string) => {
      handleLocationSearch(cityName);
    }, 1500),
    [],
  );

  const onChangeText = (cityName: string) => {
    setInputTextValue(cityName);
    handleTextDebounce(cityName);
  };

  const isLoadingWithText = loading && inputTextValue?.length > 0;
  const hasLocationsAndInputFocus = locations?.length > 0 && inputFocus;
  const hasNoResults = inputFocus && !loading && inputTextValue?.length > 0;

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
            {isLoadingWithText ? (
              <View style={styles.resultsContainer}>
                <LoaderItem />
              </View>
            ) : hasLocationsAndInputFocus ? (
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
                    {id < locations?.length - 1 && <Divider />}
                  </View>
                ))}
              </View>
            ) : hasNoResults ? (
              <View style={styles.resultsContainer}>
                <Text style={styles.noResultsText}>No results found.</Text>
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
    marginHorizontal: 4,
    borderRadius: 16,
    backgroundColor: 'white',
  },
  itemStyle: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  noResultsText: {
    padding: 16,
    textAlign: 'center',
    fontSize: 16,
    color: 'lightgray',
  },
  text: {
    fontSize: 16,
  },
  emptyScreenText: {
    fontSize: 16,
    color: 'lightgray',
  },
});
