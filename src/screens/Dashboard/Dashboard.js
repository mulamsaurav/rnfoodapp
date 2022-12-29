import {SafeAreaView, View, Text, Image, Pressable} from 'react-native';
import React, {useState} from 'react';
import {styles} from './styles';
import AddIcon from '../../assets/add-icon.png';
import OrdersIcon from '../../assets/orders-icon.png';
import TransactionIcon from '../../assets/transaction-icon.png';
import ItemsIcon from '../../assets/items-icon.png';
import BellIcon from '../../assets/bell-icon.png';
import Orders from '../App/Orders/Orders';
import Items from '../App/Items/Items';
import Add from '../App/Add/Add';
import Transaction from '../App/Transaction/Transaction';

const Dashboard = ({navigation}) => {
  const [selectedTab, setSelectedTab] = useState(0);
  const OnPress = tab => {
    setSelectedTab(tab);
  };
  return (
    <SafeAreaView style={{flex: 1}}>
      {selectedTab == 0 ? (
        <Orders navigation={navigation} />
      ) : selectedTab == 1 ? (
        <Items />
      ) : selectedTab == 2 ? (
        <Add />
      ) : selectedTab == 3 ? (
        <Transaction />
      ) : (
        <Notification />
      )}
      <View style={styles.footerContainer}>
        <Pressable style={styles.iconView} onPress={() => OnPress(0)}>
          <Image
            source={OrdersIcon}
            style={[styles.icons, selectedTab === 0 ? {tintColor: 'red'} : {}]}
          />
          <Text>Orders</Text>
        </Pressable>
        <Pressable style={styles.iconView} onPress={() => OnPress(1)}>
          <Image
            source={ItemsIcon}
            style={[styles.icons, selectedTab === 1 ? {tintColor: 'red'} : {}]}
          />
          <Text>Items</Text>
        </Pressable>
        <Pressable style={styles.iconView} onPress={() => OnPress(2)}>
          <Image
            source={AddIcon}
            style={[
              styles.icons,
              {width: 35, height: 35},
              selectedTab === 2 ? {tintColor: 'red'} : {},
            ]}
          />
          <Text>Add</Text>
        </Pressable>
        <Pressable style={styles.iconView} onPress={() => OnPress(3)}>
          <Image
            source={TransactionIcon}
            style={[styles.icons, selectedTab === 3 ? {tintColor: 'red'} : {}]}
          />
          <Text>Transaction</Text>
        </Pressable>
        <Pressable style={styles.iconView} onPress={() => OnPress(4)}>
          <Image
            source={BellIcon}
            style={[styles.icons, selectedTab === 4 ? {tintColor: 'red'} : {}]}
          />
          <Text>Items</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

export default Dashboard;
