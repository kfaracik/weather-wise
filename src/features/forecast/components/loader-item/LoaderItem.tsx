import {AnimatedViewBasic} from '@shared/components';
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {ActivityIndicator} from 'react-native-paper';

export const LoaderItem = () => {
  return (
    <AnimatedViewBasic style={styles.loaderItem} disableExiting>
      <ActivityIndicator size="small" />
      <Text style={styles.text}>Loading...</Text>
    </AnimatedViewBasic>
  );
};

const styles = StyleSheet.create({
  loaderItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 8,
  },
  text: {
    marginLeft: 8,
    fontSize: 16,
  },
});
