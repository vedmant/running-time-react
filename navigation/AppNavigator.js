import React from 'react'
import { createAppContainer, createSwitchNavigator, createStackNavigator } from 'react-navigation'
import MainTabNavigator from './MainTabNavigator'
import AuthScreen from '../screens/AuthScreen'
import AuthLoadingScreen from '../screens/AuthLoadingScreen'

export default createAppContainer(
  createSwitchNavigator({
    AuthLoading: AuthLoadingScreen,
    Auth: AuthScreen,
    Main: MainTabNavigator,
  }, {
    initialRouteName: 'AuthLoading',
  })
);
