import React, {ReactNode} from 'react';
import {View, StyleSheet} from 'react-native';
import Modal from 'react-native-modal';
import {moderateScale, verticalScale} from 'react-native-size-matters';
import colors from '../styles/colors';

type PropsType = {
  children: ReactNode;
  visible: boolean;
  onClose: Function;
  position: 'center' | 'bottom' | 'top';
  backgroundColor?: string;
  backdropOpacity?: number;
  style?: Record<string, unknown>;
};

const CustomModel = ({
  children,
  visible,
  onClose,
  position,
  backgroundColor,
  backdropOpacity,
  style,
}: PropsType) => {
  backgroundColor = backgroundColor || colors.white;
  let userStyle: Record<string, unknown> = {};
  let containerStyle: Record<string, unknown> = {};

  if (position) {
    if (position === 'center') {
      let style = {
        paddingHorizontal: verticalScale(20),
      };
      userStyle = {
        ...style,
      };
      containerStyle.borderRadius = moderateScale(10);
    } else if (position === 'bottom') {
      let style = {
        borderTopEndRadius: moderateScale(20),
        borderTopStartRadius: moderateScale(20),
      };
      userStyle.justifyContent = 'flex-end';
      containerStyle = {
        ...style,
      };
    } else if (position === 'top') {
      let style = {
        borderBottomEndRadius: moderateScale(20),
        borderBottomStartRadius: moderateScale(20),
      };
      userStyle.justifyContent = 'flex-start';
      containerStyle = {
        ...style,
      };
    } else {
      let style = {
        paddingHorizontal: verticalScale(20),
      };
      userStyle = {
        ...style,
      };
      containerStyle.borderRadius = moderateScale(10);
    }
  }

  return (
    <Modal
      isVisible={visible}
      onBackButtonPress={onClose}
      onBackdropPress={onClose}
      useNativeDriver={true}
      onSwipeComplete={onClose}
      backdropOpacity={backdropOpacity}
      swipeDirection="down"
      style={{...styles.modelContainer, ...userStyle, ...style}}>
      <View style={{...styles.container, ...containerStyle, backgroundColor}}>
        {children}
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modelContainer: {
    flex: 1,
    margin: 0,
    padding: 0,
  },
  container: {
    width: '100%',
    padding: moderateScale(15),
    maxHeight: '77%',
  },
});

export default CustomModel;
