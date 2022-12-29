import {View, Text, SafeAreaView, Image} from 'react-native';
import React, {useEffect} from 'react';
import SplashImage from '../../../assets/splash-image.png';
import {styles} from './styles';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Splash = ({navigation}) => {
  useEffect(() => {
    async function checkAuth() {
      const email = await AsyncStorage.getItem('adminLogin');
      if (email) return true;
      return false;
    }
    setTimeout(async () => {
      if (await checkAuth()) return navigation.navigate('Dashboard');
      navigation.navigate('Login');
      // navigation.navigate('Dashboard');
    }, 2000);
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Image source={SplashImage} style={styles.image} />
    </SafeAreaView>
  );
};

export default Splash;
