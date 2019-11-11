import React from 'react'
import { createAppContainer, createSwitchNavigator, createStackNavigator } from 'react-navigation'
import MainTabNavigator from './MainTabNavigator'
import AuthScreen from '../screens/Auth/AuthScreen'
import AuthLoadingScreen from '../screens/Auth/AuthLoadingScreen'

export default createAppContainer(
  createSwitchNavigator({
    AuthLoading: AuthLoadingScreen,
    Auth: createStackNavigator({
      Auth: AuthScreen,
    }),
    Main: MainTabNavigator,
  }, {
    initialRouteName: 'AuthLoading',
  })
);
