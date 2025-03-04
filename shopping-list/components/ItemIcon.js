import React from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';
import { ProductIcons } from '../constants/itemIcons';

const ItemIcon = ({ name }) => {
  const IconComponent = ProductIcons[name];

  return (
    <View style={styles.container}>
      {IconComponent ? <IconComponent width={25} height={25} /> : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  errorText: {
    color: 'red',
    fontSize: 12,
  },
});

export default ItemIcon;
