import {View, Text, SafeAreaView, Platform} from 'react-native';
import React from 'react';
import Header from '../../../Component/Appheader/Header';
import Input from '../../../Component/Input/Input';
import {styles} from './styles';
import KeyboardAvoidingWrapper from '../../../Component/KeyboardAvoidingWrapper/KeyboardAvoidingWrapper';
import Button from '../../../Component/Button/Button';
import {launchImageLibrary} from 'react-native-image-picker';
import {check, PERMISSIONS, RESULTS} from 'react-native-permissions';
import {checkPermission} from '../../../Modules/CheckPermissions';

const Add = ({navigation}) => {
  const uploadFromGallery = async () => {
    const camera_permission = await checkPermission('storage');
    console.log('d009', camera_permission);
    // let options = {mediaType: 'photo'};
    // // You can also use as a promise without 'callback':
    // const result = await launchImageLibrary(options);
    // console.log(result);
  };
  return (
    <SafeAreaView style={styles.container}>
      <Header title={'Add Items'} navigation={navigation} />
      <KeyboardAvoidingWrapper style={styles.inputContainer}>
        <View style={{marginTop: 10}}>
          <Input
            Style={styles.inputstyle}
            placeholder={'Enter item name'}
            placeholderTextColor={'black'}
            cursorColor={'black'}
            value={''}
            onchangetext={''}
          />
          <Input
            Style={styles.inputstyle}
            placeholder={'Enter item price'}
            placeholderTextColor={'black'}
            cursorColor={'black'}
            value={''}
            onchangetext={''}
            keyboardType={'numeric'}
          />
          <Input
            Style={styles.inputstyle}
            placeholder={'Enter item discount price'}
            placeholderTextColor={'black'}
            cursorColor={'black'}
            value={''}
            onchangetext={''}
          />
          <Input
            Style={styles.inputstyle}
            placeholder={'Enter item description'}
            placeholderTextColor={'black'}
            cursorColor={'black'}
            value={''}
            onchangetext={''}
            keyboardType={'default'}
          />
          <Input
            Style={styles.inputstyle}
            placeholder={'Enter item image url'}
            placeholderTextColor={'black'}
            cursorColor={'black'}
            value={''}
            onchangetext={''}
          />
          <Text style={styles.ORTxt}>OR</Text>
          <Button
            title={'Upload Image from Gallery'}
            style={styles.button}
            onpress={uploadFromGallery}
          />
          <Button title={'Upload Item'} style={styles.uploadItemButton} />
        </View>
      </KeyboardAvoidingWrapper>
    </SafeAreaView>
  );
};

export default Add;
