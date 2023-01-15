import {
  View,
  Text,
  Image,
  Pressable,
  Platform,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import React from 'react';
import {styles} from './styles';
import AndroidBackArrow from '../../assets/androidback-icon.png';
import IosBackArrow from '../../assets/iosback-icon.png';
import LogoutIcon from '../../assets/logout.png';
import ShoppingCart from '../../assets/shopping-cart.png';

const Header = ({navigation, title, logout, goBack, addCart, cartCount}) => {
  const onBack = () => {
    navigation.goBack();
  };
  console.log('sdads', cartCount);
  return (
    <View style={styles.container}>
      {goBack ? (
        <Pressable onPress={onBack}>
          <Image
            source={Platform.OS === 'ios' ? IosBackArrow : AndroidBackArrow}
            style={styles.icons}
          />
        </Pressable>
      ) : null}
      <Text style={styles.title}>{title}</Text>
      {logout ? (
        <Pressable>
          <Image source={LogoutIcon} style={styles.logoutIcons} />
        </Pressable>
      ) : null}
      {addCart ? (
        <Pressable
          style={styles.shoppingcartIconView}
          onPress={() => {
            navigation.navigate('Cart');
          }}>
          <Image source={ShoppingCart} style={styles.shoppingcartIcon} />
          <View style={styless.count}>
            <Text style={{color: 'white'}}>{cartCount}</Text>
          </View>
        </Pressable>
      ) : null}
    </View>
  );
};

export default React.memo(Header);

const styless = StyleSheet.create({
  count: {
    backgroundColor: 'red',
    width: 20,
    height: 20,
    borderRadius: 10,
    position: 'absolute',
    top: 5,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
