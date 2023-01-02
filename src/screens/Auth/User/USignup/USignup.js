import {View, Text, SafeAreaView, ImageBackground, Alert} from 'react-native';
import React, {useState} from 'react';
import {styles} from './styles';
import Input from '../../../../Component/Input/Input';
import Button from '../../../../Component/Button/Button';
import KeyboardAvoidingWrapper from '../../../../Component/KeyboardAvoidingWrapper/KeyboardAvoidingWrapper.js';
import SignupBgImage from '../../../../assets/loginbackground-image.png';
import firestore from '@react-native-firebase/firestore';
const USignup = ({navigation}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [cpassword, setCpassword] = useState('');
  const onSignup = ({navigation}) => {
    if (name !== '' && email !== '' && password !== '' && cpassword !== '') {
      firestore()
        .collection('Users')
        .add({
          name: name,
          email: email,
          password: password,
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
