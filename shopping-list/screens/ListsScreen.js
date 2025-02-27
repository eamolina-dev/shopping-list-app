import React from 'react';
import { StyleSheet, SafeAreaView, Text, View, FlatList, TouchableOpacity } from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Colors } from '../constants/colors';
import { useNavigation } from '@react-navigation/native';

const DATA = [
  { id: '1', title: 'Super' },
  { id: '2', title: 'Kiosko' },
  { id: '3', title: 'Farmacia' },
  { id: '4', title: 'Asado del finde' },
  { id: '5', title: 'Previa de Sab' },
  { id: '6', title: 'Compra del mes' },
];

const ListsScreen = () => {
  const navigation = useNavigation();

  const handleNewList = (points) => {
    console.log(points);
    navigation.navigate('NewList');
  };

  const onPressPlus = () => {

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
        data={DATA}
        ListHeaderComponent={() => listHeader()}
        renderItem={({ item }) => (
          <View style={styles.list}>
            <Text style={styles.listName}>{item.title}</Text>
          </View>
        )}
        keyExtractor={item => item.id}
        ListEmptyComponent={<Text style={{ color: 'red' }}>No hay datos</Text>}
      />

      <TouchableOpacity onPress={handleNewList} style={styles.button} >
        <FontAwesome name='plus' size={30} color='white' />
        <Text style={styles.text}>Nueva Lista</Text>
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
