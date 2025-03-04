import React, { useEffect, useState } from 'react';
import { StyleSheet, SafeAreaView, Text, View } from 'react-native';
import { Colors } from '../constants/colors';
import { useNavigation } from '@react-navigation/native';
import { setupDB, getLists, deleteAllLists } from '../db/db';
import List from '../components/List';
import Button from '../components/Button';

const ListsScreen = () => {
  const navigation = useNavigation();
  const [lists, setLists] = useState([]);

  useEffect(() => {
    const initDB = async () => {
      await setupDB();
      const data = await getLists();
      setLists(data);
    };

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

  return (
    <SafeAreaView style={styles.container}>
      <List 
        data={lists}
        listHeader={ListHeader}
        onPressItem={handleOnPressList}
        itemStyle={styles.list}
        itemNameStyle={styles.listName}
      />

      <View style={styles.buttonContainer}>
        <Button 
          text='Nueva Lista'
          onPressButton={handleAddList}
          iconName='plus'
          iconSize={30}
          iconColor='white'
        />

        <Button 
          text='Eliminar Todas'
          onPressButton={handleDeleteAll}
        />
      </View>
    </SafeAreaView>
  );
};

// Componente separado para la cabecera de la lista
const ListHeader = () => (
  <View>
    <Text style={styles.listHeader}>Mis Listas</Text>
    <View style={styles.divider} />
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: Colors.black,
    paddingTop: 56,
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
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
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
    width: 140,
  },
});

export default ListsScreen;
