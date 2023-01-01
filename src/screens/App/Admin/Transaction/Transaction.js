import {View, Text, SafeAreaView} from 'react-native';
import React from 'react';
import Header from '../../../../Component/Appheader/Header';

const Transaction = ({navigation}) => {
  return (
    <SafeAreaView>
      <Header title={'Transaction'} navigation={navigation} />
    </SafeAreaView>
  );
};

export default Transaction;
