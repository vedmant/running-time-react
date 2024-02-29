import React from 'react'
import { Platform, StatusBar, View } from 'react-native'
import AppNavigator from './navigation/AppNavigator'

export default function App () {
  return (
    <View tw="flex-1">
      {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
      <AppNavigator />
    </View>
  )
}
