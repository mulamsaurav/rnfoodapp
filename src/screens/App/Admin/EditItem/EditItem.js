import {View, Text, SafeAreaView, Platform, Image, Alert} from 'react-native';
import React, {useState} from 'react';
import Header from '../../../../Component/Appheader/Header';
import Input from '../../../../Component/Input/Input';
import {styles} from './styles';
import KeyboardAvoidingWrapper from '../../../../Component/KeyboardAvoidingWrapper/KeyboardAvoidingWrapper';
import Button from '../../../../Component/Button/Button';
import {launchImageLibrary} from 'react-native-image-picker';
import {
  checkPermission,
  PERMISSION_TYPE,
} from '../../../../Modules/CheckPermissions';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import Loader from '../../../../Component/Loader/Loader';
import {useRoute} from '@react-navigation/native';

const EditItem = ({navigation}) => {
  const route = useRoute();
  const [imageUpload, setImageUpload] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [itemName, setItemName] = useState(route?.params?.data?.itemName);
  const [itemPrice, setItemPrice] = useState(route?.params?.data?.itemPrice);
  const [itemDiscountPrice, setItemDiscountPrice] = useState(
    route?.params?.data?.itemDiscountPrice,
  );
  const [itemDesc, setItemDesc] = useState(route?.params?.data?.itemDesc);
  const [itemImageUrl, setItemImageUrl] = useState('');
  const [imageData, setImageData] = useState({
    assets: [{uri: route?.params?.data.itemImageUrl}],
  });

  const openGallery = async () => {
    const camera_permission = await checkPermission(PERMISSION_TYPE.storage);
    if (camera_permission) {
      options = {
        mediaType: 'photo',
      };
      await launchImageLibrary(options)
        .then(data => {
          setImageData(data);
          console.log(imageData);
          setImageUpload(true);
        })
        .catch(e => {
          Alert.alert('Something went wrong!');
          setImageUpload(false);
        });

      // console.log(result.assets[0].uri)
      // uploadImage(imageData.assets[0].uri);
    }
  };
  const uploadImage = async () => {
    setModalVisible(true);
    if (!imageUpload) {
      uploadItems(route?.params?.data.itemImageUrl);
    } else {
      console.log('sdadasdada3234');
      // console.log('zxZx', imageData.assets[0].fileName);
      const reference = storage().ref(imageData.assets[0].fileName);
      const pathToFile = imageData.assets[0].uri;
      // uploads file
      await reference.putFile(pathToFile);
      const downloadurl = await storage()
        .ref(imageData.assets[0].fileName)
        .getDownloadURL();
      uploadItems(downloadurl);
    }
  };
  const uploadItems = url => {
    console.log('sdadasd', url);
    firestore()
      .collection('Items')
      .doc(route?.params?.id)
      .update({
        itemName: itemName,
        itemPrice: itemPrice,
        itemDiscountPrice: itemDiscountPrice,
        itemDesc: itemDesc,
        itemImageUrl: url + '',
      })
      .then(() => {
        setModalVisible(false);
        setImageUpload(false);
        setItemName('');
        setItemDesc('');
        setImageData(null);
        setItemImageUrl('');
        setItemPrice('');
        setItemDiscountPrice('');
        console.log('Item updated!');
        navigation.push('Items');
      });
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header title={'Edit Items'} navigation={navigation} />
      <KeyboardAvoidingWrapper style={styles.inputContainer}>
        <View style={{marginTop: 10}}>
          {imageData !== null ? (
            <Image
              source={{uri: imageData.assets[0].uri}}
              style={styles.image}
              resizeMode="cover"
            />
          ) : null}
          <Input
            Style={styles.inputstyle}
            placeholder={'Enter item name'}
            placeholderTextColor={'black'}
            cursorColor={'black'}
            value={itemName}
            maxLength={15}
            onchangetext={setItemName}
          />
          <Input
            Style={styles.inputstyle}
            placeholder={'Enter item price'}
            placeholderTextColor={'black'}
            cursorColor={'black'}
            value={itemPrice}
            maxLength={4}
            onchangetext={setItemPrice}
            keyboardType={'numeric'}
          />
          <Input
            Style={styles.inputstyle}
            placeholder={'Enter item discount price'}
            placeholderTextColor={'black'}
            cursorColor={'black'}
            value={itemDiscountPrice}
            maxLength={4}
            onchangetext={setItemDiscountPrice}
          />
          <Input
            Style={styles.inputstyle}
            placeholder={'Enter item description'}
            placeholderTextColor={'black'}
            cursorColor={'black'}
            value={itemDesc}
            maxLength={45}
            onchangetext={setItemDesc}
            keyboardType={'default'}
          />
          <Input
            Style={styles.inputstyle}
            placeholder={'Enter item image url'}
            placeholderTextColor={'black'}
            cursorColor={'black'}
            value={itemImageUrl}
            maxLength={50}
            onchangetext={setItemImageUrl}
          />
          <Text style={styles.ORTxt}>OR</Text>
          <Button
            title={'Upload Image from Gallery'}
            style={styles.button}
            onpress={openGallery}
          />
          <Button
            title={'Update Item'}
            style={[
              styles.uploadItemButton,
              imageData ? {marginBottom: 70} : null,
            ]}
            onpress={() => uploadImage()}
          />
        </View>
      </KeyboardAvoidingWrapper>
      <Loader modalVisible={modalVisible} setModalVisible={setModalVisible} />
    </SafeAreaView>
  );
};

export default EditItem;
