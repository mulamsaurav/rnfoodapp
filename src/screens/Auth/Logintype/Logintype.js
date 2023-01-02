import {View, Text, SafeAreaView, StyleSheet} from 'react-native';
import React from 'react';
import Button from '../../../Component/Button/Button';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Logintype = ({navigation}) => {
  const onAdminPress = async () => {
    console.log('first');
    await AsyncStorage.setItem('TYPE', 'ADMIN');
    navigation.navigate('Login');
  };
  const onUserPress = async () => {
    await AsyncStorage.setItem('TYPE', 'USER');
    navigation.navigate('ULogin');
  };
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.titleTxt}>Select Logintype</Text>
      <Button title={'Admin Login'} onpress={() => onAdminPress()} />
      <Button title={'User Login'} onpress={() => onUserPress()} />
    </SafeAreaView>
  );
};

export default Logintype;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleTxt: {
    fontSize: 20,
    fontWeight: '700',
    color: '#000 ',
  },
});
