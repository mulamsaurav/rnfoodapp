import {Dimensions, StyleSheet} from 'react-native';

const {width, height} = Dimensions.get('window');

export const styles = StyleSheet.create({
  flatListContainer: {
    margin: '2%',
    flexDirection: 'row',
    width: width * 0.93,
    height: height * 0.13,
    backgroundColor: 'white',
    // alignItems: 'center',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 7,
  },
  image: {
    width: 75,
    height: 75,
    margin: '2%',
    borderRadius: 10,
    alignSelf: 'center',
  },
  itemNameView: {
    width: '55%',
    marginTop: 7,
  },
  itemTxt: {
    fontSize: 18,
    fontWeight: '700',
    color: 'black',
  },
  priceView: {
    flexDirection: 'row',
  },
  itemPiceTxt: {
    textDecorationLine: 'line-through',
    textDecorationStyle: 'solid',
    fontSize: 16,
    fontWeight: '700',
    color: 'gray',
  },
  iconView: {
    // position: 'absolute',
    // right: 0,
    // marginHorizontal: 25,
    width: '45%',
  },
  editIcon: {width: 24, height: 24, marginVertical: 10},
  deleteIcon: {
    width: 24,
    height: 24,
    tintColor: 'red',
  },
  addToCartBtn: {
    width: width * 0.16,
    height: height * 0.04,
    marginTop: 35,
    backgroundColor: 'green',
    // marginRight: 15,
    padding: 2,
    // justifyContent: 'center',
  },
  btnTitleStyle: {
    fontSize: 10,
  },
});
