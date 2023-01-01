import {View, Text, Image, Pressable, Platform} from 'react-native';
import React from 'react';
import {styles} from './styles';
import AndroidBackArrow from '../../assets/androidback-icon.png';
import IosBackArrow from '../../assets/iosback-icon.png';

const Header = ({navigation, title, logout, goBack}) => {
  const onBack = () => {
    navigation.goBack();
  };
  return (
    <View style={styles.container}>
      {goBack ? (
        <Pressable onPress={onBack}>
          <Image
            source={Platform.OS === 'ios' ? IosBackArrow : AndroidBackArrow}
            style={styles.icons}
          />
        </Pressable>
      ) : null}
      <Text style={styles.title}>{title}</Text>
      {logout ? (
        <Pressable>
          <Image source={AndroidBackArrow} style={styles.logoutIcons} />
        </Pressable>
      ) : null}
    </View>
  );
};

export default Header;
