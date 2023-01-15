import {View, Text, FlatList} from 'react-native';
import React, {useEffect, useState} from 'react';
import Header from '../../../../Component/Appheader/Header';
import firestore from '@react-native-firebase/firestore';
import Itemslist from '../../../../Component/ItemsList/Itemslist';
import Loader from '../../../../Component/Loader/Loader';

const Home = ({navigation}) => {
  const [item, setItem] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  useEffect(() => {
    setModalVisible(true);
    const subscriber = firestore()
      .collection('Items')
      .get()
      .then(querySnapshot => {
        let tempData = [];
        querySnapshot.forEach(documentSnapshot => {
          tempData.push({
            id: documentSnapshot.id,
            data: documentSnapshot.data(),
          });
        });
        setItem(tempData);
        setModalVisible(false);
      });

    // Stop listening for updates when no longer required
    return () => subscriber();
  }, []);
  const renderItemsList = ({item, index}) => {
    // console.log('sadasdasd', item);
    return (
      <Itemslist
        item={item}
        onItemAdd={cartCount => {
          setCartCount(cartCount);
        }}
      />
    );
  };
  return (
    <View>
      <Header
        title={'FoodApp'}
        navigation={navigation}
        addCart
        cartCount={cartCount}
      />
      <FlatList
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          margin: '2%',
        }}
        data={item}
        renderItem={renderItemsList}
        keyExtractor={item => String(item?.id)}
        ListFooterComponent={<View style={{height: 150}} />}
      />
      <Loader modalVisible={modalVisible} setModalVisible={setModalVisible} />
    </View>
  );
};

export default Home;
