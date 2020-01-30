import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import MainTabNavigator from './MainTabNavigator';
import LoginScreen from '../screens/LoginScreen';
import SignupScreen from '../screens/SignupScreen';

export default createAppContainer(
  createSwitchNavigator({
    // You could add another route here for authentication.
    // Read more at https://reactnavigation.org/docs/en/auth-flow.html
    loginFlow: createStackNavigator({
      Login: LoginScreen,
      Signup: SignupScreen
    }),
    mainFlow: MainTabNavigator,
  })
);
