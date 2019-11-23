import { createAppContainer, createSwitchNavigator } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'
import AuthLoadingScreen from '../screens/Auth/AuthLoadingScreen'
import AuthScreen from '../screens/Auth/AuthScreen'
import MainTabNavigator from './MainTabNavigator'

export default createAppContainer(
  createSwitchNavigator(
    {
      AuthLoading: AuthLoadingScreen,
      Auth: createStackNavigator({
        Auth: AuthScreen,
      }),
      Main: MainTabNavigator,
    },
    {
      initialRouteName: 'AuthLoading',
    },
  ),
)
