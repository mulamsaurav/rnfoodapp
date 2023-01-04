import {View, Text, SafeAreaView, ImageBackground, Alert} from 'react-native';
import React, {useEffect, useState} from 'react';
import {styles} from './styles';
import Input from '../../../../Component/Input/Input';
import Button from '../../../../Component/Button/Button';
import KeyboardAvoidingWrapper from '../../../../Component/KeyboardAvoidingWrapper/KeyboardAvoidingWrapper.js';
import LoginBgImage from '../../../../assets/loginbackground-image.png';
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CheckInternetConnection from '../../../../Modules/CheckInternetConnection.js';
import Loader from '../../../../Component/Loader/Loader';

const Login = ({navigation}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const checkConnection = async () => {
    let checkInternet = await new CheckInternetConnection().checkConnection();
    if (checkInternet) {
      adminLogin();
    }
  };

  const adminLogin = async () => {
    if (email !== '' && password !== '') {
      setModalVisible(true);
      const admin = await firestore().collection('Admin').get();
      const emailId = admin._docs[0]._data.email;
      const pass = admin._docs[0]._data.password;
      if (email === emailId && password === pass) {
        await AsyncStorage.setItem('isLogin', 'true');
        setModalVisible(false);
        navigation.navigate('Dashboard');
      } else {
        setModalVisible(false);
        Alert.alert('Alert!', 'Wrong Email/Password!');
      }
    } else {
      setModalVisible(false);
      alert('Please enter Email/Password !');
    }
  };
  return (
    <KeyboardAvoidingWrapper>
      <ImageBackground
        source={LoginBgImage}
        style={styles.container}
        blurRadius={5}>
        <Input
          Style={styles.inputstyle}
          placeholder={'Email'}
          placeholderTextColor={'white'}
          cursorColor={'white'}
          value={email}
          onchangetext={setEmail}
          keyboardType={'default'}
        />
        <Input
          Style={styles.inputstyle}
          placeholder={'Password'}
          placeholderTextColor={'white'}
          cursorColor={'white'}
          isSecurePass={true}
          value={password}
          onchangetext={setPassword}
          keyboardType={'default'}
        />
        <Button title={'Login'} onpress={checkConnection} />
        {/* <Text
          style={styles.loginTxt}
          onPress={() => navigation.navigate('Signup')}>
          Don't have an account, Please Signup here
        </Text> */}
        <Loader modalVisible={modalVisible} setModalVisible={setModalVisible} />
      </ImageBackground>
    </KeyboardAvoidingWrapper>
  );
};

export default Login;