import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import colors from '../styles/colors';
import {moderateScale, scale, verticalScale} from 'react-native-size-matters';
import images from '../assets/images';
import navigationStrings from '../constants/navigationStrings';

const RollNo = ({navigation}) => {
  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        <View style={styles.row1}>
          <Image source={images.logo} style={styles.logoImage} />
        </View>
        <View style={styles.row2}>
          <TouchableOpacity
            activeOpacity={0.8}
            style={styles.loginBtn}
            onPress={() =>
              navigation.navigate(navigationStrings.ENTER_ROLL_NO)
            }>
            <Text style={styles.loginBtnText}>Enter Roll Number</Text>
          </TouchableOpacity>
          <Text style={styles.orText}>or</Text>
          <TouchableOpacity
            activeOpacity={0.8}
            style={[
              styles.loginBtn,
              {
                borderWidth: 1,
                backgroundColor: colors.white,
                borderColor: colors.red,
              },
            ]}
            onPress={() => navigation.navigate(navigationStrings.SCANNER)}>
            <Text style={[styles.loginBtnText, {color: colors.red}]}>
              Scan QR
            </Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          activeOpacity={0.8}
          style={[
            styles.loginBtn,
            {
              position: 'absolute',
              bottom: verticalScale(20),
              width: '100%',
              alignSelf: 'center',
            },
          ]}
          onPress={() => navigation.navigate(navigationStrings.MANAGE)}>
          <Text style={[styles.loginBtnText]}>Manage</Text>
        </TouchableOpacity>
      </View>
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
    justifyContent: 'center',
    paddingVertical: verticalScale(30),
    gap: verticalScale(57),
  },
  logoImage: {width: moderateScale(176), height: moderateScale(176)},
  row1: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  row2: {
    gap: verticalScale(10),
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
  orText: {
    fontSize: moderateScale(16),
    fontWeight: '500',
    color: colors.black,
    textAlign: 'center',
  },
});
export default RollNo;
