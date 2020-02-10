import { AppLoading } from 'expo';
import { Asset } from 'expo-asset';
import * as Font from 'expo-font';
import React, { useState } from 'react';
import { Platform, StatusBar, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Provider as AuthProvider } from './src/context/AuthContext';
import { Provider as LiftProvider } from './src/context/LiftContext';
import { Provider as LiftInstanceProvider } from './src/context/LiftInstanceContext';
import { setNavigator } from './src/navigationRef';

import AppNavigator from './src/navigation/AppNavigator';
import FlashMessage from 'react-native-flash-message';

export default function App(props) {
  const [isLoadingComplete, setLoadingComplete] = useState(false);

  if (!isLoadingComplete && !props.skipLoadingScreen) {
    return (
      <AppLoading
        startAsync={loadResourcesAsync}
        onError={handleLoadingError}
        onFinish={() => handleFinishLoading(setLoadingComplete)}
      />
    );
  } else {
    return (
      <View style={{ flex: 1 }}>
        {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
        <AuthProvider>
          <LiftProvider>
            <LiftInstanceProvider>
              <AppNavigator ref={(navigator) => { setNavigator(navigator) }}/>
            </LiftInstanceProvider>
          </LiftProvider>
        </AuthProvider>
        <FlashMessage position="top" />
      </View>
    );
  }
}

async function loadResourcesAsync() {
  await Promise.all([
    Asset.loadAsync([
      require('./src/assets/images/robot-dev.png'),
      require('./src/assets/images/robot-prod.png'),
    ]),
    Font.loadAsync({
      // This is the font that we are using for our tab bar
      ...Ionicons.font,
      // We include SpaceMono because we use it in HomeScreen.js. Feel free to
      // remove this if you are not using it in your app
      'space-mono': require('./src/assets/fonts/SpaceMono-Regular.ttf'),
    }),
  ]);
}

function handleLoadingError(error) {
  // In this case, you might want to report the error to your error reporting
  // service, for example Sentry
  console.warn(error);
}

function handleFinishLoading(setLoadingComplete) {
  setLoadingComplete(true);
}