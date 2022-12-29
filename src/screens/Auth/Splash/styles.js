import {Dimensions, StyleSheet} from 'react-native';
import {colors} from '../../utils/colors.js';

const {width, height} = Dimensions.get('window');

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    // margin: '2%',
  },
  image: {
    width: width * 1,
    height: height,
  },
});
