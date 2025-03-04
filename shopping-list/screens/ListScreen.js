import React, { useEffect, useState } from 'react';
import { StyleSheet, SafeAreaView, Text, TouchableOpacity, FlatList, View } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { getItems, insertItemIntoList, getItemsByList } from '../db/db';
import { Colors } from '../constants/colors';
import { useNavigation } from '@react-navigation/native';
import { Products } from '../constants/products';
import ItemIcon from '../components/ItemIcon';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Modal from "react-native-modal";

const ListScreen = () => {
  const route = useRoute();
  const { id } = route.params;
  const [items, setItems] = useState([]);
  const [products, setProducts] = useState([]);
  const navigation = useNavigation();
  const [modalIsVisible, setModalIsVisible] = useState(false);

  // useEffect(() => {
  //   const fetchItems = async () => {
  //     const data = await getItemsByList(id);
  //     setItems(data);
  //   };

  //   fetchItems();
  // }, [id]);

  useEffect(() => {
    const fetchItems = async () => {
      const data = await getItems();
      setProducts(data);
    };

    fetchItems();
    console.log(products);
  }, []);

  const handleBackToLists = () => {
    navigation.navigate('Lists');
  };

  const handleAddItem = () => {
    navigation.navigate('NewItem');
  };

  const handleSelectItem = () => {
    setModalIsVisible(true);
  };

  const handleSelectItem2 = async (itemID) => {
    //await insertItem(itemName, id);
    await insertItemIntoList(id, itemID);
    const newItems = await getItemsByList(id);
    setItems(newItems);

    const newProducts = products.filter(p => p.id !== itemID);
    setProducts(newProducts);
  };
  


  const listHeader = () => {
    return(
      <View>
        <Text style={styles.listHeader}>Lista ID: {id}</Text>
        <View style={styles.divider} />
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={items.reverse()}
        ListHeaderComponent={() => listHeader()}
        renderItem={({ item }) => (
          <View style={styles.list}>
            <TouchableOpacity onPress={() => handleOnPressList(item.id)} >
              <ItemIcon name={item.name} />
              <View style={styles.itemContent}>
                <Text style={styles.listName}>{item.name}</Text>
                <FontAwesome name='plus' size={24} color='black' />
              </View>
            </TouchableOpacity>
          </View>
        )}
        keyExtractor={(item) => item.id.toString()}
        ListEmptyComponent={<Text style={{ color: 'red' }}>No hay datos</Text>}
      />

      <Text style={styles.text}>Agregar Producto</Text>
      <TouchableOpacity onPress={handleSelectItem} style={styles.button} >
        <FontAwesome name='list' size={24} color='white' />
        <Text style={styles.text}>Seleccionar</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleAddItem} style={styles.button} >
        <FontAwesome name='plus' size={30} color='white' />
        <Text style={styles.text}>Nuevo</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleBackToLists} style={styles.button}>
        <Text style={styles.text}>Volver a Listas</Text>
      </TouchableOpacity>

      <Modal 
        isVisible={modalIsVisible}
        onBackdropPress={() => setModalIsVisible(false)}
        style={styles.modalContainer}  
      >
        <View style={styles.modal}>
          <FlatList
            data={products}
            // ListHeaderComponent={() => listHeader()}
            renderItem={({ item }) => (
              <View style={styles.list}>
                <TouchableOpacity onPress={() => handleSelectItem2(item.id)} >
                  <ItemIcon name={item.name} />
                  <View style={styles.itemContent}>
                    <Text style={styles.listName}>{item.name}</Text>
                    <FontAwesome name='plus' size={24} color='black' />
                  </View>
                </TouchableOpacity>
              </View>
            )}
            keyExtractor={(item) => item.name.toString()}
            ListEmptyComponent={<Text style={{ color: 'red' }}>No hay datos</Text>}
          />
        </View>
      </Modal>
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
  itemContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  icon: {
    marginRight: 8
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
  list: {
    // minHeight: 60,
    height: 40,
    backgroundColor: Colors.green,
    paddingHorizontal: 16,
    marginVertical: 4,
    borderRadius: 16,
    justifyContent: 'center',
  },
  listName: {
    fontSize: 20,
    // fontWeight: 'bold',
    color: 'white',
    paddingLeft: 40,
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
  modal: {
    backgroundColor: 'grey',
    height: 500,
    padding: 8,
  },
  modalContainer: {
    justifyContent: "flex-end",
    margin: 0,
  },
});

export default ListScreen;
