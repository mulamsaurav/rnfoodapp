import {Dimensions, StyleSheet} from 'react-native';
import {colors} from '../../../../../utility/colors.js';
const {width, height} = Dimensions.get('window');
export const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    // marginTop: height * 0.35,
    height: height,
    width: width,
  },
  loginTxt: {
    textAlign: 'center',
    fontSize: 16,
    color: colors.white,
  },
  inputstyle: {
    fontSize: 20,
    color: 'white',
    fontWeight: '500',
    borderBottomColor: 'white',
  },
});
