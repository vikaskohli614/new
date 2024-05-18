import {View} from 'react-native';
import React from 'react';
import TopBar from '../component/TopBar';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import Approved from './manageComponents/Apporoved';
import Rejected from './manageComponents/Rejected';
import {moderateScale, verticalScale} from 'react-native-size-matters';
import colors from '../styles/colors';

const Tab = createMaterialTopTabNavigator();
const Manage = () => {
  return (
    <View style={{flex: 1, backgroundColor: '#fff'}}>
      <TopBar title={'Manage'} />
      <View style={{flex: 1, paddingTop: verticalScale(15)}}>
        <Tab.Navigator>
          <Tab.Screen
            name="Approved"
            component={Approved}
            options={{
              tabBarIndicatorStyle: {backgroundColor: colors.red},
              tabBarActiveTintColor: colors.red,
              tabBarInactiveTintColor: '#818181',
              tabBarStyle: {backgroundColor: '#fff'},
              tabBarLabelStyle: {
                fontSize: moderateScale(18),
                fontWeight: '600',
                textTransform: 'none',
              },
            }}
          />
          <Tab.Screen
            name="Rejected"
            component={Rejected}
            options={{
              tabBarIndicatorStyle: {backgroundColor: colors.red},
              tabBarActiveTintColor: colors.red,
              tabBarInactiveTintColor: '#818181',
              tabBarStyle: {backgroundColor: '#fff'},
              tabBarLabelStyle: {
                fontSize: moderateScale(18),
                fontWeight: '600',
                textTransform: 'none',
              },
            }}
          />
        </Tab.Navigator>
      </View>
    </View>
  );
};

export default Manage;
