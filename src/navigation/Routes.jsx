import React from 'react';
import {NavigationContainer, DefaultTheme} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import navigationStrings from '../constants/navigationStrings';
import Login from '../screens/Login';
import RollNo from '../screens/RollNo';
import BottomTab from './BottomTab';
import Scanner from '../screens/Scanner';
import EnterRollNo from '../screens/EnterRollNo';
import Splash from '../screens/Splash';
import Manage from '../screens/Manage';

const Stack = createStackNavigator();
const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: '#F5F4F8',
  },
};
const Routes = () => {
  return (
    <NavigationContainer theme={MyTheme}>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name={navigationStrings.SPLASH} component={Splash} />
        <Stack.Screen name={navigationStrings.LOGIN} component={Login} />
        <Stack.Screen name={navigationStrings.ROLL_NO} component={RollNo} />
        <Stack.Screen name={navigationStrings.BOTTOM_TAB} component={BottomTab}/>
        <Stack.Screen name={navigationStrings.SCANNER} component={Scanner} />
        <Stack.Screen
          name={navigationStrings.ENTER_ROLL_NO}
          component={EnterRollNo}
        />
        <Stack.Screen name={navigationStrings.MANAGE} component={Manage} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Routes;
