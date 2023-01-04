import {SafeAreaView, View, Text, Image, Pressable} from 'react-native';
import React, {useState} from 'react';
import {styles} from './styles';
import HomeIcon from '../../../../assets/home.png';
import HomeIconFilled from '../../../../assets/home_filled.png';
import WishListIcon from '../../../../assets/wishlist.png';
import WishListIconFilled from '../../../../assets/wishlist_filled.png';
import CartIocn from '../../../../assets/cart.png';
import CartIocnFilled from '../../../../assets/cart_filled.png';
import SearchIcon from '../../../../assets/search.png';
import SearchIconFilled from '../../../../assets/search_filled.png';
import ProfileIcon from '../../../../assets/profile-Icon.png';
import ProfileIconFilled from '../../../../assets/profile_filled.png';
import Home from '../../User/Home/Home.js';
import Profile from '../Profile/Profile.js';
import Cart from '../Cart/Cart.js';
import Wishlist from '../Wishlist/Wishlist';

const UDashboard = ({navigation}) => {
  const [selectedTab, setSelectedTab] = useState(0);
  const OnPress = tab => {
    setSelectedTab(tab);
  };
  return (
    <SafeAreaView style={{flex: 1}}>
      {selectedTab == 0 ? (
        <Home navigation={navigation} />
      ) : selectedTab == 1 ? (
        // <Items navigation={navigation} />
        <View />
      ) : selectedTab == 2 ? (
        <Wishlist navigation={navigation} />
      ) : selectedTab == 3 ? (
        <Cart navigation={navigation} />
      ) : (
        <Profile navigation={navigation} />
      )}
      <View style={styles.footerContainer}>
        <Pressable style={styles.iconView} onPress={() => OnPress(0)}>
          <Image
            source={selectedTab === 0 ? HomeIconFilled : HomeIcon}
            style={styles.icons}
          />
          {/* <Text>Orders</Text> */}
        </Pressable>
        <Pressable style={styles.iconView} onPress={() => OnPress(1)}>
          <Image
            source={selectedTab === 1 ? SearchIconFilled : SearchIcon}
            style={styles.icons}
          />
          {/* <Text>Items</Text> */}
        </Pressable>
        <Pressable style={styles.iconView} onPress={() => OnPress(2)}>
          <Image
            source={selectedTab === 2 ? WishListIconFilled : WishListIcon}
            style={styles.icons}
          />
          {/* <Text>Add</Text> */}
        </Pressable>
        <Pressable style={styles.iconView} onPress={() => OnPress(3)}>
          <Image
            source={selectedTab === 3 ? CartIocnFilled : CartIocn}
            style={styles.icons}
          />
          {/* <Text>Transaction</Text> */}
        </Pressable>
        <Pressable style={styles.iconView} onPress={() => OnPress(4)}>
          <Image
            source={selectedTab === 4 ? ProfileIconFilled : ProfileIcon}
            style={styles.icons}
          />
          {/* <Text>Items</Text> */}
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

export default UDashboard;
