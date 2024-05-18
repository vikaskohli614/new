import {ActivityIndicator} from 'react-native';
import React from 'react';
import colors from '../styles/colors';
import ReactNativeModal from 'react-native-modal';

const Loader = ({visible}) => {
  return (
    <ReactNativeModal
      isVisible={visible}
      style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <ActivityIndicator size={'large'} color={colors.red} />
    </ReactNativeModal>
  );
};

export default Loader;
