import {View, Text, Image, StyleSheet, ActivityIndicator} from 'react-native';
import React, {useEffect} from 'react';
import images from '../assets/images';
import {moderateScale, verticalScale} from 'react-native-size-matters';
import {apiGet, getItem} from '../utils/utils';
import navigationStrings from '../constants/navigationStrings';
import urls from '../config/urls';
import {ToastMsg} from '../utils/helperFunction';
import colors from '../styles/colors';

const Splash = ({navigation}) => {
  useEffect(() => {
    const timeout = setTimeout(() => {
      onLogin();
    }, 2000);
    return () => {
      clearTimeout(timeout);
    };
  }, []);
  const onLogin = async () => {
    try {
      const userID = await getItem('userId');
      if (userID) {
        const response = await apiGet(urls.getUser + userID);
        if (response?.statusCode) {
          return navigation.replace(navigationStrings.ROLL_NO);
        } else {
          ToastMsg('Login expired login again');
          return navigation.replace(navigationStrings.LOGIN);
        }
      } else {
        navigation.replace(navigationStrings.LOGIN);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Image
        source={images.logo}
        style={styles.logoImage}
        resizeMode="contain"
      />
      <View
        style={{
          position: 'absolute',
          width: '100%',
          alignItems: 'center',
          bottom: verticalScale(40),
        }}>
        <ActivityIndicator size={'large'} color={colors.red} />
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  logoImage: {width: moderateScale(176), height: moderateScale(176)},
});
export default Splash;
