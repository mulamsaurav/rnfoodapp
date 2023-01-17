import React from 'react';
import {View, Text, SafeAreaView} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Dashboard from '../../screens/Auth/Admin/Dashboard/Dashboard.js';
import Splash from '../../screens/Auth/Splash/Splash.js';
import Login from '../../screens/Auth/Admin/Login/Login.js';
import Orders from '../../screens/App/Admin/Orders/Orders.js';
import Items from '../../screens/App/Admin/Items/Items.js';
import Add from '../../screens/App/Admin/Add/Add.js';
import Transaction from '../../screens/App/Admin/Transaction/Transaction.js';
import EditItem from '../../screens/App/Admin/EditItem/EditItem.js';
import Logintype from '../../screens/Auth/Logintype/Logintype.js';
import ULogin from '../../screens/Auth/User/ULogin/ULogin.js';
import USignup from '../../screens/Auth/User/USignup/USignup.js';
import UDashboard from '../../screens/App/User/UDashboard/UDashboard.js';
import Cart from '../../screens/App/User/Cart/Cart.js';
import Checkout from '../../screens/App/User/Checkout/Checkout.js';
import Address from '../../screens/App/User/Address/Address.js';
import NewAddress from '../../screens/App/User/Address/NewAddress.js';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const AdminLogin = () => {
  return (
    // <Tab.Navigator>
    //   <Tab.Screen name="Feed" component={Feed} />
    //   <Tab.Screen name="Messages" component={Messages} />
    // </Tab.Navigator>
    <SafeAreaView>
      <Text>adasd</Text>
    </SafeAreaView>
  );
};

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
          name="Logintype"
          component={Logintype}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Login"
          component={Login}
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
        {/* User Screens */}
        <Stack.Screen
          name="ULogin"
          component={ULogin}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="USignup"
          component={USignup}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="UDashboard"
          component={UDashboard}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Cart"
          component={Cart}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Checkout"
          component={Checkout}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Address"
          component={Address}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="NewAddress"
          component={NewAddress}
          options={{headerShown: false}}
        />
        {/* User Screens */}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
