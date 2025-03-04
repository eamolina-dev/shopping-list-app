import React from 'react';
import { StyleSheet, View, Text, FlatList, TouchableOpacity } from 'react-native';
import ItemIcon from '../components/ItemIcon';
import FontAwesome from '@expo/vector-icons/FontAwesome';

const List = ({ data, listHeader, onPressItem, itemStyle, itemContentStyle, itemNameStyle }) => {

  return (
    <FlatList
      data={data}
      ListHeaderComponent={listHeader}
      renderItem={({ item }) => (
        <View style={itemStyle}>
          <TouchableOpacity onPress={onPressItem(item.id)} >
            <ItemIcon name={item.name} />
            <View style={itemContentStyle}>
              <Text style={itemNameStyle}>{item.name}</Text>
              <FontAwesome name='plus' size={24} color='black' />
            </View>
          </TouchableOpacity>
        </View>
      )}
      keyExtractor={(item) => item.id.toString()}
      ListEmptyComponent={<Text style={{ color: 'red' }}>No hay datos</Text>}
    />
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

export default List;
