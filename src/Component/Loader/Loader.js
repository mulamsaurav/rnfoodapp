import {
  View,
  StyleSheet,
  Modal,
  ActivityIndicator,
  Dimensions,
  Text,
} from 'react-native';
import React from 'react';
const {width, height} = Dimensions.get('window');

const Loader = ({modalVisible, setModalVisible}) => {
  return (
    <Modal
      animationType="none"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        setModalVisible(!modalVisible);
      }}>
      <View style={styles.modalMainView}>
        <View style={styles.modalView}>
          <ActivityIndicator size={50} />
          <Text>Loading</Text>
        </View>
      </View>
    </Modal>
  );
};

export default React.memo(Loader);

const styles = StyleSheet.create({
  modalMainView: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalView: {
    width: width * 0.9,
    height: height * 0.1,
    borderRadius: 10,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
