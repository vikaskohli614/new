import {Dimensions, ToastAndroid} from 'react-native';
import {showMessage} from 'react-native-flash-message';

export const {height, width} = Dimensions.get('window');

const showError = (message: string) => {
  showMessage({
    type: 'danger',
    icon: 'danger',
    message,
  });
};

const showSuccess = (message: string) => {
  showMessage({
    type: 'success',
    icon: 'success',
    message,
  });
};

const ToastMsg = (msg: string) => {
  ToastAndroid.showWithGravity(msg, ToastAndroid.LONG, ToastAndroid.CENTER);
};

const isValidObjectId = (id: any) => {
  const objectIdPattern = /^[0-9a-fA-F]{24}$/;

  return objectIdPattern.test(id);
};

export {showError, showSuccess, ToastMsg, isValidObjectId};
