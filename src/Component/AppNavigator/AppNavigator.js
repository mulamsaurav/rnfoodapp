import React from 'react';
import {View, Text, SafeAreaView} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Dashboard from '../../screens/Dashboard/Dashboard';
import Splash from '../../screens/Auth/Splash/Splash';
import Login from '../../screens/Auth/Login/Login';
import Signup from '../../screens/Auth/Signup/Signup';
import Orders from '../../screens/App/Orders/Orders';
import Items from '../../screens/App/Items/Items';
import Add from '../../screens/App/Add/Add';
import Transaction from '../../screens/App/Transaction/Transaction';

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
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
