import {
  View,
  Text,
  SafeAreaView,
  FlatList,
  Image,
  TouchableOpacity,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {useIsFocused} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import firestore from '@react-native-firebase/firestore';
import {styles} from './styles';
import Header from '../../../../Component/Appheader/Header';
import Loader from '../../../../Component/Loader/Loader';
import Button from '../../../../Component/Button/Button';
let userId = '';
const Cart = ({navigation}) => {
  const isFocused = useIsFocused();
  const [cartData, setCartData] = useState([]);
  const [modalVisible, setModalVisible] = useState(true);
  useEffect(() => {
    getCartItems();
  }, [isFocused]);

  const getCartItems = async () => {
    userId = await AsyncStorage.getItem('USERID');
    const user = await firestore().collection('Users').doc(userId).get();
    setCartData(user?._data?.cart);
    setModalVisible(false);
  };
  const addRemoveItem = async (item, action) => {
    setModalVisible(true);
    const user = await firestore().collection('Users').doc(userId).get();
    let tempData = [];
    tempData = user._data.cart;
    if (tempData.length > 0) {
      let existing = false;
      tempData.map(itm => {
        if (action == 'add') {
          if (itm.id == item.id) {
            existing = true;
            itm.data.qty = itm.data.qty + 1;
          }
        } else {
          if (itm.id == item.id) {
            existing = true;
            itm.data.qty = itm.data.qty - 1;
          }
        }
      });
      if (existing == false) {
        tempData.push(item);
      }
      await firestore().collection('Users').doc(userId).update({
        cart: tempData,
      });
      setModalVisible(false);
    } else {
      tempData.push(item);
      await firestore().collection('Users').doc(userId).update({
        cart: tempData,
      });
    }
    getCartItems();
  };

  const deleteItem = async index => {
    const user = await firestore().collection('Users').doc(userId).get();
    let tempDart = [];
    tempDart = user._data.cart;
    tempDart.splice(index, 1);
    firestore().collection('Users').doc(userId).update({
      cart: tempDart,
    });
    getCartItems();
  };
  const calTotal = () => {
    let total = 0;
    cartData.map(item => {
      total = total + item.data.qty * item.data.itemDiscountPrice;
    });
    return total;
  };
  const onCheckout = async () => {
    userId = await AsyncStorage.getItem('USERID');
    const user = await firestore().collection('Users').doc(userId).get();
    const add = user._data.addresses;
    if (add != []) {
      navigation.navigate('Checkout');
    } else {
      Alert.alert('Alert Title', 'Your address not set', [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {text: 'SET', onPress: () => navigation.navigate('NewAddress')},
      ]);
    }
  };

  const renderCartItem = ({item, index}) => {
    if (item.data.qty !== 0) {
      return (
        <View>
          <View style={styles.flatListContainer}>
            <Image
              source={{uri: item?.data?.itemImageUrl}}
              style={styles.image}
              loadingIndicatorSource={{uri: item?.data?.itemImageUrl}}
            />
            <View style={styles.itemNameView}>
              <Text style={styles.itemTxt}>{item?.data?.itemName}</Text>
              <Text style={[styles.itemTxt, {fontSize: 16}]}>
                {item?.data?.itemDesc}
              </Text>
              <View style={styles.priceView}>
                <Text
                  style={[
                    styles.itemTxt,
                    {
                      fontSize: 18,
                      color: 'green',
                      marginRight: 5,
                    },
                  ]}>
                  {'$' + item?.data?.itemDiscountPrice}
                </Text>
                <Text style={styles.itemPiceTxt}>
                  {'$' + item?.data?.itemPrice}
                </Text>
              </View>
            </View>

            <View style={styles.addRemoveBtnView}>
              <TouchableOpacity
                style={[styles.addremoveBtn, {marginRight: 5}]}
                onPress={() => {
                  if (item.data.qty > 1) {
                    addRemoveItem(item, 'remove');
                  } else {
                    deleteItem(index);
                  }
                }}
                disabled={item?.data?.qty == 0 ? true : false}>
                <Text style={styles.plusMinusTxt}>-</Text>
              </TouchableOpacity>
              <Text style={styles.quantityTxt}>{item.data.qty}</Text>
              <TouchableOpacity
                style={[styles.addremoveBtn, {marginLeft: 5}]}
                onPress={() => {
                  addRemoveItem(item, 'add');
                }}>
                <Text style={styles.plusMinusTxt}>+</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      );
    } else {
      return null;
    }
  };
  return (
    <SafeAreaView style={{flex: 1}}>
      <Header title={'Cart'} goBack navigation={navigation} />
      {cartData.length === 0 ? (
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          <Text>Your cart is empty!</Text>
          <Button
            title={'Shop now !'}
            style={styles.shopBtn}
            titleStyle={styles.shopTitleStyle}
            onpress={() =>
              navigation.navigate('UDashboard', {totalPrice: calTotal()})
            }
          />
        </View>
      ) : (
        <View style={{flex: 1}}>
          <FlatList
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
              margin: '2%',
            }}
            data={cartData}
            renderItem={renderCartItem}
            keyExtractor={item => String(item?.id)}
            ListFooterComponent={<View style={{height: 50}} />}
          />
          <View style={styles.footerView}>
            <Text style={styles.totalPriceTxt}>
              {'Total Price $ ' + calTotal()}
            </Text>
            <Button
              title={'Checkout'}
              style={styles.checkoutBtn}
              onpress={() => onCheckout()}
            />
          </View>
        </View>
      )}
      <Loader modalVisible={modalVisible} setModalVisible={setModalVisible} />
    </SafeAreaView>
  );
};

export default Cart;
