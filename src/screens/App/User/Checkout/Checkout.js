import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Dimensions,
  Image,
  Alert,
  SafeAreaView,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {useIsFocused, useRoute} from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Header from '../../../../Component/Appheader/Header';
import Loader from '../../../../Component/Loader/Loader';
import Button from '../../../../Component/Button/Button';
let userId = '';
const Checkout = ({navigation}) => {
  const isFocused = useIsFocused();
  const route = useRoute();
  const [selectedAddress, setSelectedAddress] = useState('');
  const [cartData, setCartData] = useState([]);
  const [modalVisible, setModalVisible] = useState(true);

  useEffect(() => {
    getCartItems();
    getAddresses();
  }, [isFocused]);

  const getCartItems = async () => {
    userId = await AsyncStorage.getItem('USERID');
    const user = await firestore().collection('Users').doc(userId).get();
    setCartData(user?._data?.cart);
    setModalVisible(false);
  };

  const getAddresses = async () => {
    setModalVisible(true);
    const userId = await AsyncStorage.getItem('USERID');
    const addressId = await AsyncStorage.getItem('ADDRESS');
    const user = await firestore().collection('Users').doc(userId).get();
    let tempData = [];
    tempData = user._data.addresses;
    tempData.map(item => {
      if (item.addressId == addressId) {
        console.log(item);
        setSelectedAddress(item);
      } else {
        item.selected = false;
      }
    });
    console.log('asdasdasd', selectedAddress);
    setModalVisible(false);
  };
  const calTotal = () => {
    let total = 0;
    cartData.map(item => {
      total = total + item.data.qty * item.data.itemDiscountPrice;
    });
    return total;
  };

  const renderCartItem = ({item, index}) => {
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
                {'₹' + item?.data?.itemDiscountPrice}
              </Text>
              <Text style={styles.itemPiceTxt}>
                {'₹' + item?.data?.itemPrice}
              </Text>
            </View>
          </View>
          <Text style={styles.qtyTxt}>{'Qty : ' + item.data.qty}</Text>
        </View>
      </View>
    );
  };
  return (
    <SafeAreaView style={styles.container}>
      <Header title={'Checkout'} goBack navigation={navigation} />
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
        <View
          style={{
            flexDirection: 'row',
            // justifyContent: 'space-around',
            flex: 1,
            padding: '2%',
          }}>
          <Text style={styles.totalPriceTxt}>{'Total Price  '}</Text>
          <Text style={styles.totalPriceTxt}>{'₹ ' + calTotal()}</Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-around',
            flex: 1,
            marginHorizontal: '2%',
            // padding: '2%',
          }}>
          <Text style={[styles.itemTxt, {fontSize: 16}]}>
            {'Address :) ' +
              '\n' +
              'Street: ' +
              selectedAddress.street +
              '\n' +
              'City: ' +
              selectedAddress.city +
              '\n' +
              'Pincode: ' +
              selectedAddress.pincode +
              '\n' +
              'Mobile: ' +
              selectedAddress.mobile}
          </Text>
          <Button
            title={'Change Address'}
            style={styles.changeAddBtn}
            titleStyle={styles.changeAddText}
            onpress={() => navigation.navigate('Address')}
          />
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-around',
            flex: 1,
            // padding: '2%',
          }}>
          <Button
            title={'Place Order'}
            style={styles.placeOrderBtn}
            titleStyle={styles.placeOrderTxt}
          />
        </View>
      </View>
      <Loader modalVisible={modalVisible} setModalVisible={setModalVisible} />
    </SafeAreaView>
  );
};

export default React.memo(Checkout);
const {width, height} = Dimensions.get('window');
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  flatListContainer: {
    margin: '2%',
    flexDirection: 'row',
    width: width * 0.93,
    height: height * 0.13,
    backgroundColor: 'white',
    alignItems: 'center',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 7,
  },
  image: {
    width: 75,
    height: 75,
    margin: '2%',
    borderRadius: 10,
    alignSelf: 'center',
  },
  itemNameView: {
    width: '55%',
    marginTop: 7,
  },
  itemTxt: {
    fontSize: 18,
    fontWeight: '700',
    color: 'black',
  },
  priceView: {
    flexDirection: 'row',
  },
  itemPiceTxt: {
    textDecorationLine: 'line-through',
    textDecorationStyle: 'solid',
    fontSize: 16,
    fontWeight: '700',
    color: 'gray',
  },
  qtyTxt: {
    fontSize: 15,
    fontWeight: '700',
    color: '#000',
  },
  footerView: {},
  footerView: {
    position: 'absolute',
    bottom: 0,
    backgroundColor: '#fff',
    width: width,
    // height: height * 0.3,
    // alignItems: 'flex-start',
    // justifyContent: 'space-evenly',
    // flexDirection: 'row',
  },
  totalPriceTxt: {
    fontSize: 20,
    fontWeight: '700',
    color: 'red',
  },
  checkoutBtn: {
    backgroundColor: 'green',
    width: width * 0.3,
    height: height * 0.06,
  },
  changeAddBtn: {
    width: width * 0.3,
    height: height * 0.04,
    backgroundColor: 'orange',
  },
  changeAddText: {
    fontSize: 12,
  },
  placeOrderBtn: {
    width: width * 0.6,
    height: height * 0.05,
    backgroundColor: 'green',
  },
  placeOrderTxt: {
    fontSize: 17,
  },
});
