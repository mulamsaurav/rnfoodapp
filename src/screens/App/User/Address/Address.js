import {
  View,
  Text,
  Alert,
  FlatList,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Image,
  SafeAreaView,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {useIsFocused} from '@react-navigation/native';
import Button from '../../../../Component/Button/Button';
import Header from '../../../../Component/Appheader/Header';
import EditIcon from '../../../../assets/edit.png';
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Loader from '../../../../Component/Loader/Loader';
const Address = ({navigation}) => {
  const isFocused = useIsFocused();
  const [modalVisible, setModalVisible] = useState(true);
  const [addresses, setAddresses] = useState([]);
  useEffect(() => {
    getAddresses();
  }, [isFocused]);

  const getAddresses = async () => {
    setModalVisible(true);
    const userId = await AsyncStorage.getItem('USERID');
    const addressId = await AsyncStorage.getItem('ADDRESS');
    const user = await firestore().collection('Users').doc(userId).get();
    let tempData = [];
    tempData = user._data.addresses;
    tempData.map(item => {
      if (item.addressId == addressId) {
        item.selected = true;
      } else {
        item.selected = false;
      }
    });
    setAddresses(tempData);
    setModalVisible(false);
  };

  onSetDefault = async item => {
    await AsyncStorage.setItem('ADDRESS', item.addressId);
    let tempData = [];
    tempData = addresses;
    tempData.map(itm => {
      if (itm.addressId == item.addressId) {
        itm.selected = true;
      } else {
        itm.selected = false;
      }
    });
    let temp = [];
    tempData.map(item => {
      temp.push(item);
    });
    setAddresses(temp);
  };
  const renderCartItem = ({item, index}) => {
    return (
      <View>
        <View style={styles.flatListContainer}>
          <View style={styles.itemNameView}>
            <Text style={styles.itemTxt}>{item?.street}</Text>
            <Text style={styles.itemTxt}>{item?.city}</Text>
            <Text style={[styles.itemTxt, {fontSize: 16}]}>
              {item?.pincode}
            </Text>
            <Text style={styles.itemTxt}>{item?.mobile}</Text>
          </View>
          <View style={styles.iconView}>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('NewAddress', {
                  address: item,
                  existing: true,
                })
              }>
              <Image source={EditIcon} style={styles.editIcon} />
            </TouchableOpacity>
            {item?.selected ? (
              <Button
                title={'Default'}
                style={[styles.defaultBtn, {backgroundColor: 'grey'}]}
                titleStyle={styles.defaultTxt}
              />
            ) : (
              <Button
                title={'Set Default'}
                style={styles.defaultBtn}
                titleStyle={styles.defaultTxt}
                onpress={() => onSetDefault(item)}
              />
            )}
          </View>
        </View>
      </View>
    );
  };
  return (
    <SafeAreaView style={{flex: 1}}>
      <Header title={'Address'} goBack navigation={navigation} />
      <FlatList
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          margin: '2%',
        }}
        data={addresses}
        renderItem={renderCartItem}
        keyExtractor={item => String(item?.addressId)}
        ListFooterComponent={<View style={{height: 50}} />}
      />
      <View style={styles.btnView}>
        <Button
          title={'Add New Address'}
          onpress={() => navigation.navigate('NewAddress')}
          style={styles.btnStyle}
        />
      </View>
      <Loader modalVisible={modalVisible} setModalVisible={setModalVisible} />
    </SafeAreaView>
  );
};

export default React.memo(Address);
const {width, height} = Dimensions.get('window');
const styles = StyleSheet.create({
  btnView: {
    position: 'absolute',
    bottom: 5,
    backgroundColor: '#fff',
    width: width,
    height: height * 0.1,
    alignItems: 'center',
    justifyContent: 'space-evenly',
    flexDirection: 'row',
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
  itemNameView: {
    // width: '55%',
    margin: '2%',
  },
  itemTxt: {
    fontSize: 18,
    fontWeight: '700',
    color: 'black',
  },
  iconView: {
    // position: 'absolute',
    // right: 0,
    marginHorizontal: width * 0.19,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    width: '45%',
  },
  editIcon: {width: 24, height: 24, marginVertical: 10},
  defaultBtn: {
    width: width * 0.19,
    height: height * 0.04,
    backgroundColor: 'green',
  },
  defaultTxt: {
    fontSize: 13,
  },
});
