import {View, SafeAreaView, FlatList} from 'react-native';
import React, {useEffect, useState} from 'react';
import Header from '../../../../Component/Appheader/Header';
import firestore from '@react-native-firebase/firestore';
import Loader from '../../../../Component/Loader/Loader';
import Itemslist from '../../../../Component/ItemsList/Itemslist';

const Items = ({navigation}) => {
  const [items, setItems] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  useEffect(() => {
    getItemsData();
  }, []);

  const getItemsData = () => {
    setModalVisible(true);
    firestore()
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
        setItems(tempData);
        setModalVisible(false);
      });
  };

  const renderItemsList = ({item, index}) => {
    return <Itemslist navigation={navigation} item={item} isAdmin />;
  };

  return (
    <SafeAreaView>
      {/* <Header title={'Items'} navigation={navigation} /> */}
      <FlatList
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{margin: '2%'}}
        data={items}
        renderItem={renderItemsList}
        keyExtractor={item => String(item?.id)}
        ListFooterComponent={<View style={{height: 150}} />}
      />
      <Loader modalVisible={modalVisible} setModalVisible={setModalVisible} />
    </SafeAreaView>
  );
};

export default Items;
