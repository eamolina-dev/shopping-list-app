import React, { useEffect, useState } from 'react';
import { StyleSheet, SafeAreaView, Text, View, FlatList, TouchableOpacity } from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Colors } from '../constants/colors';
import { useNavigation } from '@react-navigation/native';
import { setupDB, getLists, insertList, deleteAllLists } from '../db/db';

const ListsScreen = () => {
  const navigation = useNavigation();
  const [lists, setLists] = useState([]);
  const [newList, setNewList] = useState('');

  const initDB = async () => {
    await setupDB();
    const data = await getLists();
    setLists(data);
  };

  useEffect(() => {
    initDB();
  }, []);

  const handleAddList = () => {
    navigation.navigate('NewList');
  };

  const handleDeleteAll = async () => {
    await deleteAllLists();
    setLists([]);
  };  

  const handleOnPressList = (listId) => {
    navigation.navigate('List', { id: listId });
  };

  const listHeader = () => {
    return(
      <View>
        <Text style={styles.listHeader}>Mis Listas</Text>
        <View style={styles.divider} />
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={lists}
        ListHeaderComponent={() => listHeader()}
        renderItem={({ item }) => (
          <View style={styles.list}>
            <TouchableOpacity onPress={() => handleOnPressList(item.id)} >
              <Text style={styles.listName}>{item.name}</Text>
            </TouchableOpacity>
          </View>
        )}
        keyExtractor={(item) => item.id.toString()}
        ListEmptyComponent={<Text style={{ color: 'red' }}>No hay datos</Text>}
      />

      <TouchableOpacity onPress={handleAddList} style={styles.button} >
        <FontAwesome name='plus' size={30} color='white' />
        <Text style={styles.text}>Nueva Lista</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleDeleteAll} style={styles.deleteButton}>
        <Text style={{ color: 'white' }}>Eliminar Todas</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: Colors.black,
    paddingTop: 56
  },
  list: {
    minHeight: 60,
    backgroundColor: Colors.green,
    padding: 16,
    marginVertical: 6,
    borderRadius: 16,
    justifyContent: 'center',
  },
  listName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
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
  text: {
    fontSize: 18,
    color: 'white'
  },
  listHeader: {
    fontSize: 24, 
    fontWeight: 'bold', 
    color: 'white',
  },
  divider: {
    height: 4,
    backgroundColor: Colors.orange,
    marginVertical: 16,
    width: 140
  },
});

export default ListsScreen;
