import { createAppContainer, createStackNavigator, createSwitchNavigator } from 'react-navigation'
import AuthLoadingScreen from '../screens/Auth/AuthLoadingScreen'
import AuthScreen from '../screens/Auth/AuthScreen'
import MainTabNavigator from './MainTabNavigator'

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
)
