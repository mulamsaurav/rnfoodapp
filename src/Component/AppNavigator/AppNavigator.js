import React from 'react';
import {View, Text, SafeAreaView} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Dashboard from '../../screens/Auth/Admin/Dashboard/Dashboard.js';
import Splash from '../../screens/Auth/Splash/Splash.js';
import Login from '../../screens/Auth/Admin/Login/Login.js';
import Signup from '../../screens/Auth/Admin/Signup/Signup.js';
import Orders from '../../screens/App/Admin/Orders/Orders.js';
import Items from '../../screens/App/Admin/Items/Items.js';
import Add from '../../screens/App/Admin/Add/Add.js';
import Transaction from '../../screens/App/Admin/Transaction/Transaction.js';
import EditItem from '../../screens/App/Admin/EditItem/EditItem.js';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function Home() {
  return (
    // <Tab.Navigator>
    //   <Tab.Screen name="Feed" component={Feed} />
    //   <Tab.Screen name="Messages" component={Messages} />
    // </Tab.Navigator>
    <SafeAreaView>
      <Text>adasd</Text>
    </SafeAreaView>
  );
}

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Splash"
          component={Splash}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Login"
          component={Login}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Signup"
          component={Signup}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Dashboard"
          component={Dashboard}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Orders"
          component={Orders}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Items"
          component={Items}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Add"
          component={Add}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Transaction"
          component={Transaction}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="EditItem"
          component={EditItem}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
