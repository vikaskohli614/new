import {View} from 'react-native';
import React from 'react';
import QRCodeScanner from 'react-native-qrcode-scanner';
import navigationStrings from '../constants/navigationStrings';
import TopBar from '../component/TopBar';
import {ToastMsg, isValidObjectId, showError} from '../utils/helperFunction';

const Scanner = ({navigation}) => {
  const onSuccess = e => {
    // console.log('QR Response is -> ' + JSON.stringify(e));
    if (e?.data) {
      if (!isValidObjectId(e?.data)) {
        showError('Please scan a valid QR Code');
        ToastMsg('Please scan a valid QR Code');
        return;
      }
      console.log(e?.data)
      return navigation.replace(navigationStrings.BOTTOM_TAB, {
        rollNo: e?.data,
      });
    }
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#000',
      }}>
      <TopBar title={'Scan QR'} />
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <QRCodeScanner
          onRead={onSuccess}
          // flashMode={RNCamera.Constants.FlashMode.torch}
          cameraStyle={{flex: 1, height: '100%'}}
        />
      </View>
    </View>
  );
};

export default Scanner;
