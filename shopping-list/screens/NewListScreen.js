import React from 'react';
import { StyleSheet, SafeAreaView, Text, TextInput } from 'react-native';
import { Colors } from '../constants/colors';
import { useNavigation } from '@react-navigation/native';

const NewListScreen = () => {
  const onChangeText = () => {
    
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.text}>Nueva lista</Text>
      <TextInput
        style={styles.input}
        onChangeText={onChangeText}
        value="Nueva lista"
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: Colors.black,
    paddingTop: 56,
    justifyContent: 'center',
  },
  text: {
    fontSize: 18,
    color: 'white'
  },
  input: {
    backgroundColor: 'white',
    borderRadius: 12,
  }
});

export default NewListScreen;
