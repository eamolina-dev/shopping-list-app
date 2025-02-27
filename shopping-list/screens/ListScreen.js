import React, { useEffect, useState } from 'react';
import { StyleSheet, SafeAreaView, Text, TouchableOpacity } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { getItemsByList } from '../db/db';
import { Colors } from '../constants/colors';
import { useNavigation } from '@react-navigation/native';


const ListScreen = () => {
  const route = useRoute();
  const { id } = route.params;
  const [items, setItems] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchItems = async () => {
      const data = await getItemsByList(id);
      setItems(data);
    };

    fetchItems();
  }, [id]);

  const handleBackToLists = () => {
    navigation.navigate('Lists');
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.text}>Lista ID: {id}</Text>

      <TouchableOpacity onPress={handleBackToLists} style={styles.button}>
        <Text style={styles.text}>Volver a Listas</Text>
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
  },
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

export default ListScreen;
