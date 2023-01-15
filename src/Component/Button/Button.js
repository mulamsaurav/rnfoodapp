import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import {styles} from './styles';

const Button = ({title, onpress, style, titleStyle}) => {
  return (
    <TouchableOpacity
      onPress={onpress}
      style={[styles.button, style]}
      activeOpacity={0.3}>
      <Text style={[styles.titleTxt, titleStyle]}>{title}</Text>
    </TouchableOpacity>
  );
};

export default React.memo(Button);
