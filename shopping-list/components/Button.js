import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Colors } from '../constants/colors';

const Button = ({ text, onPressButton, iconName, iconSize, iconColor }) => {

  return (
    <TouchableOpacity onPress={onPressButton} style={styles.button} >
      <FontAwesome name={iconName} size={iconSize} color={iconColor} />
      <Text style={styles.text}>{text}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: 18,
    color: 'white'
  },
  button: {
    height: 56,
    width: 170,
    borderRadius: 20,
    justifyContent: 'space-evenly',
    alignItems: 'center',
    margin: 8,
    borderColor: Colors.green,
    borderWidth: 6,
    flexDirection: 'row',
  },
});

export default Button;
