import {Dimensions, StyleSheet} from 'react-native';

const {width, height} = Dimensions.get('window');

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 7,
    borderRadius: 4,
  },
  icons: {
    width: 32,
    height: 32,
    margin: '3%',
  },
  title: {
    color: '#000',
    marginHorizontal: 10,
    fontSize: 20,
    fontWeight: '700',
    // margin: '3%',
  },
  logoutIcons: {
    width: 32,
    height: 32,
    marginHorizontal: width * 0.5,
  },
});
