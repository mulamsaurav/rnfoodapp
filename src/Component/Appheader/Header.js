import {View, Text, Image, Pressable, Platform} from 'react-native';
import React from 'react';
import {styles} from './styles';
import AndroidBackArrow from '../../assets/androidback-icon.png';
import IosBackArrow from '../../assets/iosback-icon.png';

const Header = ({navigation, title, logout}) => {
  const onBack = () => {
    navigation.goBack();
  };
  return (
    <Pressable style={styles.container} onPress={onBack}>
      <Image
        source={Platform.OS === 'ios' ? IosBackArrow : AndroidBackArrow}
        style={styles.icons}
      />
      <Text style={styles.title}>{title}</Text>
      {logout ? (
        <Image source={AndroidBackArrow} style={styles.logoutIcons} />
      ) : null}
    </Pressable>
  );
};

export default Header;
