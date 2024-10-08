import React from 'react';
import {StyleSheet, View, Image} from 'react-native';
import {Text} from 'react-native-paper';

export const DetailItem = ({
  iconSource,
  label,
}: {
  iconSource: any;
  label: string;
}) => (
  <View style={styles.detailItem}>
    <Image source={iconSource} style={styles.icon} />
    <Text>{label}</Text>
  </View>
);

const styles = StyleSheet.create({
  detailItem: {
    gap: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
  },
});
