import {View, Text, SafeAreaView, ImageBackground, Alert} from 'react-native';
import React, {useEffect, useState} from 'react';
import {styles} from './styles';
import Input from '../../../../Component/Input/Input';
import Button from '../../../../Component/Button/Button';
import KeyboardAvoidingWrapper from '../../../../Component/KeyboardAvoidingWrapper/KeyboardAvoidingWrapper.js';
import SignupBgImage from '../../../../assets/loginbackground-image.png';
import firestore from '@react-native-firebase/firestore';
import uuid from 'react-native-uuid';
const USignup = ({navigation}) => {
  let userId = uuid.v4();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [password, setPassword] = useState('');
  const [cpassword, setCpassword] = useState('');

  const onSignup = () => {
    if (name !== '' && email !== '' && password !== '' && cpassword !== '') {
      firestore()
        .collection('Users')
        .doc(userId)
        .set({
          name: name,
          email: email,
          mobile_number: mobileNumber,
          password: password,
          userId: userId,
          role: 'USER',
          cart: [],
          addresses: [],
        })
        .then(() => {
          console.log('User added!');
          navigation.navigate('ULogin');
        });
    } else {
      Alert.alert('Please enter all fields');
    }
  };
  return (
    <KeyboardAvoidingWrapper>
      <ImageBackground
        source={SignupBgImage}
        style={styles.container}
        blurRadius={5}>
        <Input
          placeholder={'Name'}
          Style={styles.inputstyle}
          placeholderTextColor={'white'}
          cursorColor={'white'}
          value={name}
          onchangetext={setName}
          keyboardType={'default'}
        />
        <Input
          placeholder={'Email'}
          Style={styles.inputstyle}
          placeholderTextColor={'white'}
          cursorColor={'white'}
          value={email}
          onchangetext={setEmail}
          keyboardType={'default'}
        />
        <Input
          placeholder={'Mobile Number'}
          Style={styles.inputstyle}
          placeholderTextColor={'white'}
          cursorColor={'white'}
          value={mobileNumber}
          onchangetext={setMobileNumber}
          keyboardType={'numeric'}
          maxLength={10}
        />
        <Input
          placeholder={'Password'}
          isSecurePass={true}
          Style={styles.inputstyle}
          placeholderTextColor={'white'}
          cursorColor={'white'}
          value={password}
          onchangetext={setPassword}
          keyboardType={'default'}
        />
        <Input
          placeholder={'Confirm Password'}
          isSecurePass={true}
          Style={styles.inputstyle}
          placeholderTextColor={'white'}
          cursorColor={'white'}
          value={cpassword}
          onchangetext={setCpassword}
          keyboardType={'default'}
        />
        <Button title={'Signup'} onpress={onSignup} />
        <Text
          style={styles.signupTxt}
          onPress={() => navigation.navigate('ULogin')}>
          Already have an account, Login here
        </Text>
      </ImageBackground>
    </KeyboardAvoidingWrapper>
  );
};

export default USignup;
