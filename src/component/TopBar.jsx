import {View, TouchableOpacity, Text, StyleSheet} from 'react-native';
import React from 'react';
import {moderateScale, scale, verticalScale} from 'react-native-size-matters';
import Icons from '../assets/icons';
import colors from '../styles/colors';

const TopBar = ({title, backIcon}) => {
  return (
    <View style={styles.container}>
      {backIcon && (
        <TouchableOpacity>
          <Icons.backArrow />
        </TouchableOpacity>
      )}

      <View style={styles.titleContainer}>
        <Text style={styles.title}>{title}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: verticalScale(65),
    alignItems: 'center',
    backgroundColor: colors.red,
    borderBottomEndRadius: moderateScale(20),
    borderBottomStartRadius: moderateScale(20),
    flexDirection: 'row',
    paddingHorizontal: scale(20),
  },
  titleContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: moderateScale(24),
    fontWeight: '600',
    color: colors.white,
  },
});
export default TopBar;
