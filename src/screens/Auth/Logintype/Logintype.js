import {View, Text, SafeAreaView, StyleSheet, Dimensions} from 'react-native';
import React, {useState} from 'react';
import Button from '../../../Component/Button/Button';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Languagemodal from '../../../Component/LanguageModal/Languagemodal';
const {width, height} = Dimensions.get('window');
const Logintype = ({navigation}) => {
  const [languageModalVisible, setLanguageModalVisible] = useState(false);
  const onAdminPress = async () => {
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
      <Button
        title={'Select Language'}
        style={styles.languageBtn}
        onpress={() => setLanguageModalVisible(!languageModalVisible)}
      />
      <Languagemodal
        languageModalVisible={languageModalVisible}
        setLanguageModalVisible={setLanguageModalVisible}
        onSelect={async Language => {
          await AsyncStorage.setItem('LANG', Language);
        }}
      />
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
  languageBtn: {
    width: width * 0.5,
    backgroundColor: 'gray',
    position: 'absolute',
    bottom: height * 0.1,
    height: height * 0.04,
  },
});
