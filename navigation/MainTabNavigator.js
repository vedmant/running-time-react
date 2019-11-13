import React from 'react'
import { Platform } from 'react-native'
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation'
import TabBarIcon from '../components/TabBarIcon'
import DashboardScreen from '../screens/DashboardScreen'
import EntriesScreen from '../screens/EntriesScreen'
import SettingsScreen from '../screens/SettingsScreen'

const config = Platform.select({
  web: { headerMode: 'screen' },
  default: {},
})

const HomeStack = createStackNavigator(
  {
    Home: DashboardScreen,
  },
  config,
)
HomeStack.navigationOptions = {
  tabBarLabel: 'Dashboard',
  tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="dashboard" />,
}
HomeStack.path = ''

const EntriesStack = createStackNavigator(
  {
    Entries: EntriesScreen,
  },
  config,
)
EntriesStack.navigationOptions = {
  tabBarLabel: 'Entries',
  tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name={'table'} />,
}
EntriesStack.path = ''

const ProfileStack = createStackNavigator(
  {
    Settings: SettingsScreen,
  },
  config
)
ProfileStack.navigationOptions = {
  tabBarLabel: 'Profile',
  tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name={'user'} />,
}
ProfileStack.path = ''

const tabNavigator = createBottomTabNavigator({
  HomeStack,
  EntriesStack,
  ProfileStack,
})

tabNavigator.path = ''

export default tabNavigator
