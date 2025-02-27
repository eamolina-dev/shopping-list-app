import React from 'react';
import { StyleSheet, SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const ListScreen = () => {

  return (
    <SafeAreaView style={styles.container}>

    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    width: '100%',
  },
});

export default ListScreen;
