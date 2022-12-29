import {Dimensions, Platform, StyleSheet} from 'react-native';

const {width, height} = Dimensions.get('window');

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: 'gray',
  },
  inputContainer: {
    width: width * 0.8,
    borderBottomWidth: 1,
    marginVertical: Platform.OS === 'ios' ? 25 : 10,
    // marginVertical: height * 0.009,
  },
  eyeIcon: {
    marginHorizontal: -35,
    width: 32,
    height: 32,
  },
});
