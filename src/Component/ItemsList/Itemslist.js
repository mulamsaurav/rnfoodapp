import {View, Text, Image, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useIsFocused} from '@react-navigation/native';
import EditIcon from '../../assets/edit.png';
import DeleteIcon from '../../assets/delete.png';
import {styles} from './styles';
import Button from '../Button/Button';
import AsyncStorage from '@react-native-async-storage/async-storage';
import firestore from '@react-native-firebase/firestore';
const Itemslist = ({navigation, item, isAdmin, onItemAdd}) => {
  let userId = '';
  const isFocused = useIsFocused();
  // const [cartData, setCartData] = useState(null);
  useEffect(() => {
    getCartItems();
  }, [isFocused]);

  const deleteItem = id => {
    firestore()
      .collection('Items')
      .doc(id)
      .delete()
      .then(() => {
        console.log('Item deleted!');
        getItemsData();
      });
  };

  const getCartItems = async () => {
    userId = await AsyncStorage.getItem('USERID');
    const user = await firestore().collection('Users').doc(userId).get();
    console.log(user);
    onItemAdd(user._data.cart.length);
  };
  const onAddToCart = async (item, index) => {
    userId = await AsyncStorage.getItem('USERID');
    const user = await firestore().collection('Users').doc(userId).get();
    let tempData = [];
    tempData = user._data.cart;
    try {
      if (tempData.length > 0) {
        let existing = false;
        tempData.map(itm => {
          if (itm.id === item.id) {
            existing = true;
            itm.data.qty = itm.data.qty + 1;
          }
        });
        if (existing == false) {
          item.data.qty = 1;
          tempData.push(item);
        }
        firestore().collection('Users').doc(userId).update({
          cart: tempData,
        });
      } else {
        item.data.qty = 1;
        tempData.push(item);
        firestore().collection('Users').doc(userId).update({
          cart: tempData,
        });
      }
      onItemAdd(user._data.cart.length);
    } catch (err) {
      console.log(err);
    }
  };
  return (
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
          <Text style={styles.itemPiceTxt}>{'₹' + item?.data?.itemPrice}</Text>
        </View>
      </View>
      {isAdmin ? (
        <View style={styles.iconView}>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('EditItem', {data: item?.data, id: item?.id})
            }>
            <Image source={EditIcon} style={styles.editIcon} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              deleteItem(item?.id);
            }}>
            <Image source={DeleteIcon} style={styles.deleteIcon} />
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.iconView}>
          <Button
            title={'Add to Cart'}
            style={styles.addToCartBtn}
            titleStyle={styles.btnTitleStyle}
            onpress={() => {
              onAddToCart(item);
            }}
          />
        </View>
      )}
    </View>
  );
};

export default React.memo(Itemslist);
