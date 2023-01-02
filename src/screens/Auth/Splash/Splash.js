import {View, Text, SafeAreaView, Image} from 'react-native';
import React, {useEffect, useState} from 'react';
import SplashImage from '../../../assets/splash-image.png';
import {styles} from './styles';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Loader from '../../../Component/Loader/Loader';

const Splash = ({navigation}) => {
  const [modalVisible, setModalVisible] = useState(true);
  useEffect(() => {
    async function checkAuth() {
      let email = await AsyncStorage.getItem('isLogin');
      const type = await AsyncStorage.getItem('TYPE');
      // console.log(type);
      if (email !== null) email = true;
      return {type, email};
    }
    setTimeout(async () => {
      console.log((await checkAuth()).email);
      if (!(await checkAuth()).email) {
        setModalVisible(false);
        return navigation.navigate('Logintype');
      } else {
        if ((await checkAuth()).type === 'ADMIN') {
          setModalVisible(false);
          return navigation.navigate('Dashboard');
        } else {
          setModalVisible(false);
          return navigation.navigate('UDashboard');
        }
      }
      // navigation.navigate('Logintype');
    }, 2000);
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Image source={SplashImage} style={styles.image} />
      <Loader modalVisible={modalVisible} setModalVisible={setModalVisible} />
    </SafeAreaView>
  );
};

export default Splash;
