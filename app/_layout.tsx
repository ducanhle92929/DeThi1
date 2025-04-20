import React from 'react';
import { Provider } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { store } from './redux/store';
import HomeScreen from './screens/HomeScreen';
import AddEditScreen from './screens/AddEditScreen';
import { XeMay } from './models/XeMay'; // Import XeMay type

// Define the param list for the stack navigator
type RootStackParamList = {
  Home: undefined;
  AddEdit: { xeMay?: XeMay };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const App = () => {
  return (
    <Provider store={store}>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{ title: 'Danh sách xe máy' }}
          />
          <Stack.Screen
            name="AddEdit"
            component={AddEditScreen}
            options={({ route }) => ({
              title: route.params?.xeMay ? 'Sửa xe' : 'Thêm xe',
            })}
          />
        </Stack.Navigator>
    </Provider>
  );
};

export default App;