import React from 'react'
import { Platform } from 'react-native'
import { createBottomTabNavigator } from 'react-navigation-tabs'
import { createStackNavigator } from 'react-navigation-stack'
import TabBarIcon from '../components/TabBarIcon'
import DashboardScreen from '../screens/Dashboard/DashboardScreen'
import AddEntryScreen from '../screens/Entries/AddEntryScreen'
import EditEntryScreen from '../screens/Entries/EditEntryScreen'
import EntriesScreen from '../screens/Entries/EntriesScreen'
import ProfileScreen from '../screens/Profile/ProfileScreen'

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
    AddEntry: AddEntryScreen,
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
    Settings: ProfileScreen,
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
