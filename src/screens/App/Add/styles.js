import {Dimensions, StyleSheet} from 'react-native';

const {width, height} = Dimensions.get('window');

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  inputContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    margin: '1%',
  },
  inputstyle: {
    fontSize: 16,
    fontWeight: '500',
    color: 'black',
    borderBottomColor: 'black',
    width: width * 0.9,
  },
  ORTxt: {
    fontSize: 18,
    color: 'black',
    textAlign: 'center',
    fontWeight: '500',
  },
  button: {
    alignSelf: 'center',
    height: height * 0.06,
    width: width * 0.7,
  },
  uploadItemButton: {
    alignSelf: 'center',
    height: height * 0.06,
    width: width * 0.7,
    backgroundColor: 'green',
  },
});
