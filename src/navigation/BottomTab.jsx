import React, {useEffect} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import navigationStrings from '../constants/navigationStrings';
import Home from '../screens/Home';
import Manage from '../screens/Manage';
import {StatusBar, Text, TouchableOpacity, View} from 'react-native';
import {moderateScale, verticalScale} from 'react-native-size-matters';
import colors from '../styles/colors';
import icons from '../assets/icons';

const Tab = createBottomTabNavigator();
const BottomTab = ({route}) => {
  return (
    <Tab.Navigator
      screenOptions={{headerShown: false}}
      tabBar={props => <MyTabBar {...props} />}>
      <Tab.Screen name={navigationStrings.HOME} component={Home} initialParams={route?.params}/>
      <Tab.Screen name={navigationStrings.MANAGE} component={Manage} />
    </Tab.Navigator>
  );
};

function MyTabBar({state, descriptors, navigation}) {
  return (
    <View
      style={{
        flexDirection: 'row',
        zIndex: 999,
        height: verticalScale(55),
        overflow: 'hidden',
        borderTopEndRadius: moderateScale(20),
        borderTopStartRadius: moderateScale(20),
        backgroundColor: colors.white,
        elevation: 16,
      }}>
      {state.routes.map((route, index) => {
        const {options} = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name, route.params);
          }
        };

        let Icon;
        switch (label) {
          case 'Home':
            Icon = isFocused ? icons.homeRed : icons.homeBrown;
            break;
          case 'Manage':
            Icon = isFocused ? icons.manageRed : icons.manageBrown;
        }

        return (
          <TouchableOpacity
            key={index}
            accessibilityRole="button"
            accessibilityState={isFocused ? {selected: true} : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            activeOpacity={0.9}
            style={{
              flex: 1,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Icon />
            <Text style={{color: isFocused ? colors.red : colors.black}}>
              {label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

export default BottomTab;
