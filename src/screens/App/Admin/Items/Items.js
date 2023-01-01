import {
  View,
  Text,
  SafeAreaView,
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Header from '../../../../Component/Appheader/Header';
import firestore from '@react-native-firebase/firestore';
import EditIcon from '../../../../assets/edit.png';
import DeleteIcon from '../../../../assets/delete.png';
import Loader from '../../../../Component/Loader/Loader';
import {styles} from './styles';

const Items = ({navigation}) => {
  const [items, setItems] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  useEffect(() => {
    getItemsData();
  }, []);

  const getItemsData = () => {
    setModalVisible(true);
    firestore()
      .collection('Items')
      .get()
      .then(querySnapshot => {
        let tempData = [];
        console.log('Total users: ', querySnapshot.size);

        querySnapshot.forEach(documentSnapshot => {
          tempData.push({
            id: documentSnapshot.id,
            data: documentSnapshot.data(),
          });
        });
        setItems(tempData);
        setModalVisible(false);
      });
  };

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

  const renderFavoriteItem = ({item, index}) => {
    return (
      <View style={styles.flatListContainer}>
        <Image
          source={{uri: item?.data?.itemImageUrl}}
          style={styles.image}
          loadingIndicatorSource={{uri: item?.data?.itemImageUrl}}
        />
        <View style={styles.itemNameView}>
          <Text style={styles.itemTxt}>{item.data.itemName}</Text>
          <Text style={[styles.itemTxt, {fontSize: 16}]}>
            {item.data.itemDesc}
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
      </View>
    );
  };

  return (
    <SafeAreaView>
      {/* <Header title={'Items'} navigation={navigation} /> */}
      <FlatList
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          margin: '2%',
          // alignItems: 'center',
          // justifyContent: 'center',
          // width: '100%',
        }}
        // style={{flex: 1, alignItems: 'center'}}
        data={items}
        renderItem={renderFavoriteItem}
        keyExtractor={item => String(item?.id)}
        ListFooterComponent={<View style={{height: 150}} />}
      />
      <Loader modalVisible={modalVisible} setModalVisible={setModalVisible} />
    </SafeAreaView>
  );
};

export default Items;
