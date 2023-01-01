import {View, Text, SafeAreaView} from 'react-native';
import React from 'react';
import Header from '../../../../Component/Appheader/Header';

const Orders = ({navigation}) => {
  return (
    <SafeAreaView>
      <Header title={'Orders'} navigation={navigation} logout />
    </SafeAreaView>
  );
};

export default Orders;
