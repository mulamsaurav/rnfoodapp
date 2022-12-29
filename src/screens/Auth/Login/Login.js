import {View, Text, SafeAreaView, ImageBackground} from 'react-native';
import React, {useEffect, useState} from 'react';
import {styles} from './styles';
import Input from '../../../Component/Input/Input';
import Button from '../../../Component/Button/Button';
import KeyboardAvoidingWrapper from '../../../Component/KeyboardAvoidingWrapper/KeyboardAvoidingWrapper.js';
import LoginBgImage from '../../../assets/loginbackground-image.png';
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CheckInternetConnection from '../../../Modules/CheckInternetConnection.js';

const Login = ({navigation}) => {
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
      const admin = await firestore().collection('Admin').get();
      const emailId = admin._docs[0]._data.email;
      const pass = admin._docs[0]._data.password;
      console.log('Data', admin._docs[0]._data.email);
      if (email === emailId && password === pass) {
        await AsyncStorage.setItem('adminLogin', 'Login');
        navigation.navigate('Dashboard');
      }
    } else {
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
        <Text
          style={styles.loginTxt}
          onPress={() => navigation.navigate('Signup')}>
          Don't have an account, Please Signup here
        </Text>
      </ImageBackground>
    </KeyboardAvoidingWrapper>
  );
};

export default Login;
