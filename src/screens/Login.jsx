import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';
import colors from '../styles/colors';
import {moderateScale, scale, verticalScale} from 'react-native-size-matters';
import images from '../assets/images';
import navigationStrings from '../constants/navigationStrings';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {apiPost, setItem} from '../utils/utils';
import urls from '../config/urls';
import Loader from '../component/Loader';
import {showError} from '../utils/helperFunction';

const Login = ({navigation}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState({
    email: '',
    password: '',
  });
  const onLogin = async () => {
    if (!userData?.email || !userData?.password) {
      showError('All fields are required');
      return;
    }
    setLoading(true);
    try {
      const response = await apiPost(urls.login, userData);
      if (response?.statusCode == 200) {
        await setItem('token', response?.data?.token);
        await setItem('userId', response?.data?.user?._id);
        setLoading(false);
        return navigation.navigate(navigationStrings.ROLL_NO);
      }
      showError(response?.message);
      setLoading(false);
      console.log(response);
    } catch (error) {
      setLoading(false);
      console.log(error);
      showError('Network Error');
    }
    // navigation.navigate(navigationStrings.ROLL_NO);
  };
  return (
    <View style={styles.container}>
      <KeyboardAwareScrollView contentContainerStyle={{flexGrow: 1}}>
        <View style={styles.innerContainer}>
          <View style={styles.row1}>
            <Image source={images.logo} style={styles.logoImage} />
          </View>
          <View style={styles.row2}>
            <Text style={styles.letLoginText}>Let’s Log In</Text>
            <View>
              <Text style={styles.inputText}>Email</Text>
              <TextInput
                placeholder="Enter your email"
                placeholderTextColor={colors.disableColor}
                value={userData?.email}
                style={styles.inputStyle}
                onChangeText={value =>
                  setUserData(prev => ({...prev, email: value}))
                }
              />
            </View>
            <View>
              <Text style={styles.inputText}>Password</Text>
              <TextInput
                placeholder="Enter your password"
                secureTextEntry={!showPassword}
                value={userData?.password}
                placeholderTextColor={colors.disableColor}
                style={styles.inputStyle}
                onChangeText={value =>
                  setUserData(prev => ({...prev, password: value}))
                }
              />
            </View>
            <TouchableOpacity
              style={{alignSelf: 'flex-end'}}
              onPress={() => setShowPassword(!showPassword)}>
              <Text style={styles.showPasswordText}>
                {showPassword ? 'Hide password' : 'Show password'}
              </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.row3}>
            <TouchableOpacity
              activeOpacity={0.8}
              style={styles.loginBtn}
              onPress={onLogin}>
              <Text style={styles.loginBtnText}>Login</Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAwareScrollView>
      <Loader visible={loading} />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.red,
    padding: moderateScale(15),
  },
  innerContainer: {
    flex: 1,
    backgroundColor: colors.white,
    borderRadius: moderateScale(20),
    paddingHorizontal: scale(12),
    justifyContent: 'space-around',
    paddingVertical: verticalScale(30),
  },
  row1: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  row2: {
    gap: verticalScale(20),
  },
  row3: {},
  inputStyle: {
    backgroundColor: colors.whiteTheme,
    borderWidth: 1,
    borderRadius: moderateScale(12),
    paddingHorizontal: scale(15),
    paddingVertical: verticalScale(12),
    color: colors.black,
  },
  inputText: {
    fontSize: moderateScale(16),
    fontWeight: '500',
    color: colors.black,
  },
  showPasswordText: {
    fontSize: moderateScale(12),
    fontWeight: '600',
    color: '#1F4C6B',
  },
  letLoginText: {
    fontSize: moderateScale(25),
    fontWeight: '500',
    color: colors.black,
  },
  logoImage: {width: moderateScale(176), height: moderateScale(176)},
  loginBtn: {
    backgroundColor: colors.red,
    padding: moderateScale(17),
    borderRadius: moderateScale(12),
  },
  loginBtnText: {
    fontSize: moderateScale(16),
    fontWeight: '700',
    textAlign: 'center',
    color: colors.white,
  },
});
export default Login;
