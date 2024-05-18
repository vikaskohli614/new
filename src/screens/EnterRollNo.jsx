import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';
import TopBar from '../component/TopBar';
import colors from '../styles/colors';
import {moderateScale, scale, verticalScale} from 'react-native-size-matters';
import {ToastMsg, isValidObjectId, showError} from '../utils/helperFunction';
import navigationStrings from '../constants/navigationStrings';

const EnterRollNo = ({navigation}) => {
  const [rollNo, setRollNo] = useState('');
  const onPressed = () => {
    if (!rollNo) {
      showError('Please enter a valid Roll Number');
      ToastMsg('Please enter a valid Roll Number');
      return;
    }
    navigation.replace(navigationStrings.BOTTOM_TAB, {
      rollNo,
    });
  };
  return (
    <View style={{flex: 1}}>
      <TopBar title={'Enter Roll Number'} />
      <View
        style={{
          flex: 1,
          padding: moderateScale(20),
          justifyContent: 'center',
          gap: verticalScale(30),
        }}>
        <View />
        <TextInput
          placeholder="Enter Roll Number"
          value={rollNo}
          placeholderTextColor={colors.disableColor}
          style={styles.inputStyle}
          onChangeText={value => setRollNo(value)}
        />
        <View>
          <TouchableOpacity
            activeOpacity={0.8}
            style={styles.loginBtn}
            onPress={onPressed}>
            <Text style={styles.loginBtnText}>Login</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  inputStyle: {
    backgroundColor: colors.whiteTheme,
    borderWidth: 1,
    borderRadius: moderateScale(12),
    paddingHorizontal: scale(15),
    paddingVertical: verticalScale(12),
  },
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
export default EnterRollNo;
