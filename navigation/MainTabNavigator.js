import React from 'react'
import { Platform } from 'react-native'
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation'
import TabBarIcon from '../components/TabBarIcon'
import DashboardScreen from '../screens/DashboardScreen'
import EntriesScreen from '../screens/Entries/EntriesScreen'
import EditEntryScreen from '../screens/Entries/EditEntryScreen'
import SettingsScreen from '../screens/SettingsScreen'

const config = Platform.select({
  web: { headerMode: 'screen' },
  default: {},
})

const DashboardStack = createStackNavigator(
  {
    Home: DashboardScreen,
  },
  config,
)
DashboardStack.navigationOptions = {
  tabBarLabel: 'Dashboard',
  tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="dashboard" />,
}
DashboardStack.path = ''

const EntriesStack = createStackNavigator(
  {
    Entries: EntriesScreen,
    EditEntry: EditEntryScreen,
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
  DashboardStack,
  EntriesStack,
  ProfileStack,
})

tabNavigator.path = ''

export default tabNavigator
