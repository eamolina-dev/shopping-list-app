import React, { useEffect, useState } from 'react';
import { StyleSheet, SafeAreaView, Text, View } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { getItems, insertItemIntoList, getItemsByList } from '../db/db';
import { Colors } from '../constants/colors';
import Modal from 'react-native-modal';
import List from '../components/List';
import Button from '../components/Button';

const ListScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { id } = route.params;
  
  const [items, setItems] = useState([]);
  const [products, setProducts] = useState([]);
  const [modalIsVisible, setModalIsVisible] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const listItems = await getItemsByList(id);
      const allProducts = await getItems();
      setItems(listItems);
      setProducts(allProducts);
    };
    fetchData();
  }, [id]);

  const handleBackToLists = () => navigation.navigate('Lists');
  const handleAddItem = () => navigation.navigate('NewItem');
  const handleSelectItem = () => setModalIsVisible(true);
  
  const handleSelectItem2 = async (itemID) => {
    await insertItemIntoList(id, itemID);
    setItems(await getItemsByList(id));
    setProducts(products.filter(p => p.id !== itemID));
  };

  return (
    <SafeAreaView style={styles.container}>
      <List 
        data={[...items].reverse()}
        listHeader={() => <ListHeader id={id} />}
        onPressItem={() => {}}
        itemStyle={styles.list}
        itemContentStyle={styles.itemContent}
        itemNameStyle={styles.listName}
      />
      
      <Text style={styles.text}>Agregar Producto</Text>
      <View style={styles.buttonContainer}>
        <Button text='Seleccionar' onPressButton={handleSelectItem} iconName='list' iconSize={24} iconColor='white' />
        <Button text='Nuevo' onPressButton={handleAddItem} iconName='plus' iconSize={30} iconColor='white' />
        <Button text='Volver a Listas' onPressButton={handleBackToLists} />
      </View>
      
      <Modal isVisible={modalIsVisible} onBackdropPress={() => setModalIsVisible(false)} style={styles.modalContainer}>
        <View style={styles.modal}>
          <List 
            data={products}
            onPressItem={handleSelectItem2}
            itemStyle={styles.list}
            itemContentStyle={styles.itemContent}
            itemNameStyle={styles.listName}
          />
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const ListHeader = ({ id }) => (
  <View>
    <Text style={styles.listHeader}>Lista ID: {id}</Text>
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
  text: {
    fontSize: 18,
    color: 'white',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
  },
  itemContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  list: {
    height: 40,
    backgroundColor: Colors.green,
    paddingHorizontal: 16,
    marginVertical: 4,
    borderRadius: 16,
    justifyContent: 'center',
  },
  listName: {
    fontSize: 20,
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
    width: 140,
  },
  modal: {
    backgroundColor: 'grey',
    height: 500,
    padding: 8,
  },
  modalContainer: {
    justifyContent: 'flex-end',
    margin: 0,
  },
});

export default ListScreen;
