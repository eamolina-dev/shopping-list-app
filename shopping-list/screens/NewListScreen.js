import React, { useState } from 'react';
import { StyleSheet, SafeAreaView, Text, TextInput, TouchableOpacity } from 'react-native';
import { Colors } from '../constants/colors';
import { insertList, getLists, setLists } from '../db/db';
import { useNavigation } from '@react-navigation/native';

const NewListScreen = () => {
  const [listName, setListName] = useState('Nueva lista');
  const navigation = useNavigation();

  const onChangeText = (newName) => {
    setListName(newName);
  };

  const handleAddList = async () => {
    const newListId = await insertList(listName);
    const data = await getLists();

    if (newListId) {
      navigation.navigate('List', { id: newListId });
    }
  };
  
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.text}>Nueva lista</Text>
      <TextInput
        style={styles.input}
        onChangeText={onChangeText}
        value={listName}
        placeholder="Ingrese el nombre de la lista"
      />
      <TouchableOpacity onPress={handleAddList} style={styles.button}>
        <Text style={styles.text}>Crear lista</Text>
      </TouchableOpacity>
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

export default NewListScreen;
