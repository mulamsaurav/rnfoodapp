import {Alert, Linking, Platform} from 'react-native';
import React from 'react';
import {
  request,
  PERMISSIONS,
  RESULTS,
  check,
  openSettings,
} from 'react-native-permissions';

let Permission = '';

const PLATEFORM_STORAGE_PERMISSION = {
  ios: PERMISSIONS.IOS.PHOTO_LIBRARY,
  android: PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE,
};
const REQUEST_PERMISSION_TYPE = {
  storage: PLATEFORM_STORAGE_PERMISSION,
  // camera: PLATEFORM_CAMERA_PERMISSION,
  // phone_state: PLATEFORM_PERMISSION,
  // biometric: PLATEFORM_BIOMETREICS_PERMISSION,
  // bluetooth: PLATEFORM_BLUETOOTH_PERMISSION,
  // record_audio: PLATEFORM_RECORD_AUDIO_PERMISSION,
  // location: PLATEFORM_LOCATION_PERMISSION,
};

const PERMISSION_TYPE = {
  storage: 'storage',
  phone_state: 'phone_state',
  biometric: 'biometric',
  camera: 'camera',
  bluetooth: 'bluetooth',
  record_audio: 'record_audio',
  location: 'location',
};

//chcek permission if granted then allow to open

const checkPermission = async type => {
  console.log('inside check prmition');
  const permission = REQUEST_PERMISSION_TYPE[type][Platform.OS];
  try {
    console.log('permition var:-', permission);
    const result = await check(permission);
    console.log('check permission', result);
    if (result === RESULTS.GRANTED) {
      console.log('garnted');
      return (Permission = type);
    } else if (result === RESULTS.BLOCKED || result === RESULTS.DENIED) {
      console.log('first');
      requestPermission(permission, type);
      // return reqPermission(permission, type);
    }
  } catch (error) {
    Alert.alert('Alert!', 'App permission result fail ');
    return false;
  }
};

//request permission
const requestPermission = async (permission, type) => {
  try {
    const result = await request(permission);
    console.log('request permition', result);
    if (result === RESULTS.BLOCKED) {
      permissionHandler();
    } else if (result === RESULTS.DENIED) {
      return reqPermission(permission, type);
    } else if (result === RESULTS.GRANTED) {
      return (Permission = type);
    }
  } catch (error) {
    console.log('asdasdas', error);
    Alert.alert('Alert!', 'App permission result fail ');
    return false;
  }
};

const reqPermission = async (permission, type) => {
  Alert.alert(
    'Alert',
    'Permissions Required',
    type + ' permission is required to use this feature !',
    [
      {text: 'cancel'},
      {
        text: 'ok',
        onPress: async () => {
          return await requestPermission(permission, type);
        },
      },
    ],
  );
};

//if permission is block then allow through setting
const permissionHandler = () => {
  return Alert.alert(
    'Alert!',
    'Permission Required',
    'Required permission(s) have been set not to ask again! Please provide them from settings',
    [{text: 'cancel'}, {text: 'settings', onPress: () => openSettings()}],
  );
};
export {checkPermission, requestPermission, reqPermission, permissionHandler};
