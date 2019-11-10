import React from 'react'
import { createAppContainer, createSwitchNavigator, createStackNavigator } from 'react-navigation'
import MainTabNavigator from './MainTabNavigator'
import SignInScreen from '../screens/SignInScreen'
import AuthLoadingScreen from '../screens/AuthLoadingScreen'

export default createAppContainer(
  createSwitchNavigator({
    AuthLoading: AuthLoadingScreen,
    Auth: createStackNavigator({
      SignIn: SignInScreen,
    }),
    Main: MainTabNavigator,
  }, {
    initialRouteName: 'AuthLoading',
  })
);
