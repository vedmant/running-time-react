import React from 'react'
import { createMaterialBottomTabNavigator } from 'react-native-paper/react-navigation'
import { createStackNavigator } from '@react-navigation/stack'
import DashboardScreen from '../screens/Dashboard/DashboardScreen'
import AddEntryScreen from '../screens/Entries/AddEntryScreen'
import EditEntryScreen from '../screens/Entries/EditEntryScreen'
import EntriesScreen from '../screens/Entries/EntriesScreen'
import ProfileScreen from '../screens/Profile/ProfileScreen'
import { SquaresFour, ListDashes, User } from 'phosphor-react-native'

const Stack = createStackNavigator()

function EntriesStack () {
  return (<Stack.Navigator>
    <Stack.Screen name="Entries" component={EntriesScreen} />
    <Stack.Screen name="EditEntry" component={EditEntryScreen} />
    <Stack.Screen name="AddEntry" component={AddEntryScreen} />
  </Stack.Navigator>)
}

const Tab = createMaterialBottomTabNavigator()

function MyTabs () {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Dashboard" component={DashboardScreen} options={{
        tabBarLabel: 'Dashboard',
        tabBarIcon: ({ color }) => (
          <SquaresFour name="home" color={color} size={26} />
        ),
      }} />
      <Tab.Screen name="Entries" component={EntriesStack} options={{
        tabBarLabel: 'Entries',
        tabBarIcon: ({ color }) => (
          <ListDashes name="home" color={color} size={26} />
        ),
      }} />
      <Tab.Screen name="Profile" component={ProfileScreen} options={{
        tabBarLabel: 'Entries',
        tabBarIcon: ({ color }) => (
          <User name="home" color={color} size={26} />
        ),
      }}  />
    </Tab.Navigator>
  )
}

export default MyTabs
