import {View, Text, TextInput, Image, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import {styles} from './styles';
import EyeIcon from '../../assets/eye.png';
import EyeIconClose from '../../assets/eye_closed.png';

const Input = ({
  Style,
  placeholder,
  placeholderTextColor,
  cursorColor,
  isSecurePass,
  value,
  onchangetext,
  keyboardType,
}) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const toggleEyeIcon = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };
  return (
    <View style={styles.container}>
      <TextInput
        cursorColor={cursorColor}
        style={[styles.inputContainer, Style]}
        autoCapitalize={'none'}
        placeholder={placeholder}
        placeholderTextColor={placeholderTextColor}
        secureTextEntry={isSecurePass && !isPasswordVisible}
        value={value}
        onChangeText={onchangetext}
        keyboardType={keyboardType}
      />
      {isSecurePass ? (
        <TouchableOpacity onPress={toggleEyeIcon} style={{}}>
          <Image
            source={isPasswordVisible ? EyeIcon : EyeIconClose}
            style={styles.eyeIcon}
          />
        </TouchableOpacity>
      ) : null}
    </View>
  );
};

export default React.memo(Input);
