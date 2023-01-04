import {View, Text, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import EditIcon from '../../assets/edit.png';
import DeleteIcon from '../../assets/delete.png';
import {styles} from './styles';
const Itemslist = ({navigation, item, isAdmin}) => {
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
            {'$' + item?.data?.itemDiscountPrice}
          </Text>
          <Text style={styles.itemPiceTxt}>{'$' + item?.data?.itemPrice}</Text>
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
      ) : null}
    </View>
  );
};

export default React.memo(Itemslist);
