import {StatusBar} from 'react-native';
import React from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import Routes from './src/navigation/Routes';
import FlashMessage from 'react-native-flash-message';
import {moderateScale} from 'react-native-size-matters';

const App = () => {
  return (
    <SafeAreaProvider>
      <StatusBar backgroundColor={'#E31E24'} barStyle={'dark-content'} />
      <Routes />
      <FlashMessage
        titleStyle={{
          marginRight: moderateScale(5),
          fontSize: moderateScale(16),
        }}
        position="top"
      />
    </SafeAreaProvider>
  );
};

export default App;
