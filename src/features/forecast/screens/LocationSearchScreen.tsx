import React, {useCallback, useState} from 'react';
import {
  ImageBackground,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import backgroundImageSource from '@shared/assets/images/bg.webp';
import {TextInput, TouchableRipple} from 'react-native-paper';
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

  const handleLocation = (location: Location) => {
    fetchWeatherForecast({
      lat: location.lat,
      lon: location.lon,
    }).then(data => {
      setSelectedLocationForecast(data);
    });

    setInputFocus(false);
    setInputTextValue('');
  };

  const handleLocationSearch = (cityName: CityName) => {
    fetchLocation({cityName}).then(data => {
      setLocations(data);
    });
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
            />
            {locations?.length > 0 && inputFocus ? (
              <View style={styles.resultsContainer}>
                {locations.map((location, id) => {
                  return (
                    <TouchableRipple
                      key={id}
                      style={styles.itemStyle}
                      onPress={() => handleLocation(location)}>
                      <Text>
                        {location.name}, {location.state}
                      </Text>
                    </TouchableRipple>
                  );
                })}
              </View>
            ) : null}
          </View>
          {selectedLocationForecast ? <LocationForecast /> : null}
        </View>
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
  contentContainer: {
    flex: 1,
    margin: 8,
    gap: 16,
    alignItems: 'center',
  },
  searchContainer: {
    width: '100%',
  },
  searchInput: {
    borderRadius: 16,
  },
  resultsContainer: {
    marginTop: 4,
    borderRadius: 16,
    backgroundColor: 'white',
  },
  itemStyle: {
    flexDirection: 'row',
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
});
