import {Alert, Platform} from 'react-native';
import React, {Component} from 'react';
import NetInfo from '@react-native-community/netinfo';

export class CheckInternetConnection extends Component {
  constructor(props) {
    super(props);
    this.checkConnection = this.checkConnection.bind(this);
  }

  //chcek internet connection
  checkConnection = async screen => {
    let netCon = false;
    await NetInfo.fetch().then(state => {
      if (state.isConnected) {
        netCon = state.isConnected;
        // if(screen=='splash'){

        // }else{
        //
        // }
      } else {
        Alert.alert(
          Global_Attributes.Appname,
          'Please check your internet connection !',
          [
            {
              text: 'OK',
              onPress: () => {
                if (screen == 'splash') {
                  //   RNExitApp.exitApp();
                  Alert.alert('Alert!', 'Please check internet connection!');
                } else {
                  return false;
                }
              },
            },
          ],
        );
      }
    });

    return netCon;
  };
  render() {}
}

export default CheckInternetConnection;
