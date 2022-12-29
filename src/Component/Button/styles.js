import {Dimensions, StyleSheet} from 'react-native';
import {colors} from '../../../utility/colors';
const {width, height} = Dimensions.get('window');

export const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    margin: '5%',
    width: width * 0.7,
    height: height * 0.07,
    borderRadius: 10,
    backgroundColor: colors.black,
  },
  titleTxt: {
    fontSize: 20,
    color: colors.white,
  },
});
