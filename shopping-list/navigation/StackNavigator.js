import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ListsScreen from '../screens/ListsScreen';
import NewListScreen from '../screens/NewListScreen';
import ListScreen from '../screens/ListScreen';
import NewItemScreen from '../screens/NewItemScreen';

const Stack = createNativeStackNavigator();

const StackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Lists" component={ListsScreen} options={{ title: 'Listas', headerShown: false }} />
      <Stack.Screen name="NewList" component={NewListScreen} options={{ title: 'Nueva Lista', headerShown: false }} />
      <Stack.Screen name="List" component={ListScreen} options={{ title: 'Lista', headerShown: false }} />
      <Stack.Screen name="NewItem" component={NewItemScreen} options={{ title: 'Nuevo Producto', headerShown: false }} />
    </Stack.Navigator>
  );
};

export default StackNavigator;
