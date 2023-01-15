import {
  View,
  StyleSheet,
  Modal,
  ActivityIndicator,
  Dimensions,
  Text,
  FlatList,
  Image,
} from 'react-native';
import React, {useState} from 'react';
import Button from '../Button/Button';
import {RadioButton} from 'react-native-paper';
const {width, height} = Dimensions.get('window');

const LanguageModal = ({
  languageModalVisible,
  setLanguageModalVisible,
  onSelect,
}) => {
  const [language, setSelectedLanguage] = useState([
    {name: 'English'},
    {name: 'हिंदी'},
    {name: 'मराठी'},
    {name: 'தமிழ்'},
  ]);
  const [checked, setChecked] = useState('English');
  const renderLanguageList = ({item, index}) => {
    return (
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'flex-start',
          alignItems: 'center',
        }}>
        <RadioButton
          value={item.name}
          status={checked === item.name ? 'checked' : 'unchecked'}
          onPress={() => {
            setChecked(item.name);
            // setSelectedLanguage({name:item.name,se});
          }}
          color="black"
        />
        <Text style={{color: 'black', fontWeight: '500', fontSize: 16}}>
          {item.name}
        </Text>
      </View>
    );
  };
  return (
    <Modal
      animationType="none"
      transparent={true}
      visible={languageModalVisible}
      onRequestClose={() => {
        setLanguageModalVisible(!languageModalVisible);
      }}>
      <View style={styles.modalMainView}>
        <View style={styles.modalView}>
          <Text style={{color: 'black', fontWeight: '700', fontSize: 18}}>
            Select Language
          </Text>
          <View
            style={{
              height: language.length > 10 ? height * 0.5 : height * 0.3123,
              // (height * language.length) / 25
            }}>
            <FlatList
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{margin: '2%'}}
              data={language}
              renderItem={renderLanguageList}
              keyExtractor={item => String(item?.name)}
              ListFooterComponent={<View style={{height: 5}} />}
            />

            <View
              style={{
                flexDirection: 'row',
                width: width * 0.8,
                justifyContent: 'center',
                alignItems: 'center',
                margin: 10,
              }}>
              <Button
                title={'Cancel'}
                onpress={() => {
                  setLanguageModalVisible(!languageModalVisible);
                }}
                style={{width: width * 0.35, height: height * 0.05}}
              />
              <Button
                title={'Apply'}
                style={{width: width * 0.35, height: height * 0.05}}
                onpress={() => {
                  setLanguageModalVisible(!languageModalVisible);
                  onSelect(checked);
                }}
              />
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default React.memo(LanguageModal);

const styles = StyleSheet.create({
  modalMainView: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalView: {
    width: width * 0.9,
    // height: height * 0.1,
    borderRadius: 10,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    // borderColor: '#000',
    // borderWidth: 2,
  },
});
