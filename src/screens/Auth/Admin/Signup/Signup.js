import {View, Text, SafeAreaView, ImageBackground} from 'react-native';
import React from 'react';
import {styles} from './styles';
import Input from '../../../../Component/Input/Input';
import Button from '../../../../Component/Button/Button';
import KeyboardAvoidingWrapper from '../../../../Component/KeyboardAvoidingWrapper/KeyboardAvoidingWrapper.js';
import SignupBgImage from '../../../../assets/loginbackground-image.png';
const Signup = ({navigation}) => {
  const onSignup = () => {
    console.log('Signup Pressed');
  };
  return (
    <KeyboardAvoidingWrapper>
      <ImageBackground
        source={SignupBgImage}
        style={styles.container}
        blurRadius={5}>
        <Input placeholder={'Name'} />
        <Input placeholder={'Email'} />
        <Input placeholder={'Password'} isSecurePass={true} />
        <Input placeholder={'Confirm Password'} isSecurePass={true} />
        <Button title={'Signup'} onpress={onSignup} />
        <Text
          style={styles.signupTxt}
          onPress={() => navigation.navigate('Login')}>
          Already have an account, Login here
        </Text>
      </ImageBackground>
    </KeyboardAvoidingWrapper>
  );
};

export default Signup;
