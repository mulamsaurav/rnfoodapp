import {
  View,
  Text,
  StyleSheet,
  Alert,
  Dimensions,
  SafeAreaView,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import KeyboardAvoidingWrapper from '../../../../Component/KeyboardAvoidingWrapper/KeyboardAvoidingWrapper';
import Input from '../../../../Component/Input/Input';
import Button from '../../../../Component/Button/Button';
import AsyncStorage from '@react-native-async-storage/async-storage';
import firestore from '@react-native-firebase/firestore';
import Header from '../../../../Component/Appheader/Header';
import uuid from 'react-native-uuid';
import {useRoute} from '@react-navigation/native';
import {Item} from 'react-native-paper/lib/typescript/components/Drawer/Drawer';
import Loader from '../../../../Component/Loader/Loader';
const NewAddress = ({navigation}) => {
  const route = useRoute();
  const [modalVisible, setModalVisible] = useState(false);
  const [country, setCountry] = useState('India');
  const [street, setStreet] = useState(route?.params?.address?.street);
  const [city, setCity] = useState(route?.params?.address?.city);
  const [pincode, setPincode] = useState(route?.params?.address?.pincode);
  const [mobile, setMobile] = useState(route?.params?.address?.mobile);

  useEffect(() => {
    // console.log('sadas123125d', route?.params?.address?.addressId);
  }, []);

  const saveAddress = async () => {
    if (street !== '' && city !== '' && pincode !== '' && mobile !== '') {
      setModalVisible(true);
      let tempData = [];
      console.log('Existing');
      const addressId = uuid.v4();
      const userId = await AsyncStorage.getItem('USERID');
      const user = await firestore().collection('Users').doc(userId).get();
      tempData = user._data.addresses;
      if (tempData.length > 0) {
        let existing = false;
        tempData.map(itm => {
          console.log('sadasd', itm);
          if (route?.params?.address?.addressId === itm.addressId) {
            existing = true;
            itm.city = city;
            itm.street = street;
            itm.pincode = pincode;
            itm.mobile = mobile;
          }
        });
        if (!existing) {
          tempData.push({street, city, pincode, mobile, addressId});
        }
        await firestore()
          .collection('Users')
          .doc(userId)
          .update({
            addresses: tempData,
          })
          .then(res => {
            console.log('successfully added');
            setModalVisible(false);
            navigation.replace('Address');
          })
          .catch(error => {
            console.log(error);
          });
      } else {
        tempData.push({street, city, pincode, mobile, addressId});
        await firestore()
          .collection('Users')
          .doc(userId)
          .update({
            addresses: tempData,
          })
          .then(res => {
            console.log('successfully added');
            setModalVisible(false);
            navigation.replace('Address');
          })
          .catch(error => {
            console.log(error);
          });
      }
    } else {
      setModalVisible(false);
      Alert.alert('Alert!', 'Please enter all fields!');
    }
  };
  return (
    <SafeAreaView>
      <Header title={'New Address'} goBack navigation={navigation} />
      {/* <KeyboardAvoidingWrapper> */}
      <View style={{alignItems: 'center'}}>
        <Input
          placeholder={'Country'}
          Style={styles.inputstyle}
          placeholderTextColor={'black'}
          cursorColor={'black'}
          value={country}
          //   onchangetext={}
          keyboardType={'default'}
          editable={false}
        />
        <Input
          placeholder={'Enter Street*'}
          Style={styles.inputstyle}
          placeholderTextColor={'grey'}
          cursorColor={'black'}
          value={street}
          onchangetext={setStreet}
          keyboardType={'default'}
        />
        <Input
          placeholder={'Enter City*'}
          Style={styles.inputstyle}
          placeholderTextColor={'grey'}
          cursorColor={'black'}
          value={city}
          onchangetext={setCity}
          keyboardType={'default'}
        />
        <Input
          placeholder={'Enter Pincode*'}
          Style={styles.inputstyle}
          placeholderTextColor={'grey'}
          cursorColor={'black'}
          value={pincode}
          onchangetext={setPincode}
          keyboardType={'numeric'}
          maxLength={6}
        />
        <Input
          placeholder={'Enter Contact*'}
          Style={styles.inputstyle}
          placeholderTextColor={'grey'}
          cursorColor={'black'}
          value={mobile}
          onchangetext={setMobile}
          keyboardType={'numeric'}
          maxLength={10}
        />
        <Button
          style={styles.btn}
          title={'SAVE'}
          onpress={() => saveAddress()}
        />
      </View>
      {/* </KeyboardAvoidingWrapper> */}
      <Loader modalVisible={modalVisible} setModalVisible={setModalVisible} />
    </SafeAreaView>
  );
};

export default React.memo(NewAddress);
const {width, height} = Dimensions.get('window');
const styles = StyleSheet.create({
  inputstyle: {
    fontSize: 20,
    color: '#000',
    fontWeight: '500',
    borderBottomColor: 'black',
  },
  btn: {
    marginTop: height * 0.35,
    width: width * 0.25,
    height: height * 0.05,
    backgroundColor: 'green',
  },
});
