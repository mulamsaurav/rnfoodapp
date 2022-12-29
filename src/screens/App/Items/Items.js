import {View, Text, SafeAreaView} from 'react-native';
import React from 'react';
import Header from '../../../Component/Appheader/Header';

const Items = ({navigation}) => {
  return (
    <SafeAreaView>
      <Header title={'Items'} navigation={navigation} />
    </SafeAreaView>
  );
};

export default Items;
