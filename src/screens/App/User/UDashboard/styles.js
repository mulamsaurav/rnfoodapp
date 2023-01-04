import {Dimensions, StyleSheet} from 'react-native';

const {width, height} = Dimensions.get('window');

export const styles = StyleSheet.create({
  footerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    position: 'absolute',
    bottom: 0,
    backgroundColor: '#fff',
    width: width,
    height: height * 0.09,
    // marginBottom: 7,
  },
  iconView: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  icons: {
    width: 32,
    height: 32,
  },
});
