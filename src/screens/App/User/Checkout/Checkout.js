import {View, Text, StyleSheet} from 'react-native';
import React, {useState, useEffect} from 'react';
import {useIsFocused} from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Checkout = () => {
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
  return (
    <View>
      <Text>Checkout</Text>
    </View>
  );
};

export default React.memo(Checkout);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
