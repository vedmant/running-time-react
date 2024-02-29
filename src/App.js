import React from 'react'
import { Platform, StatusBar, SafeAreaView } from 'react-native'
import AppNavigator from './navigation/AppNavigator'

export default function App () {
  return (
    <SafeAreaView tw="flex-1">
      {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
      <AppNavigator />
    </SafeAreaView>
  )
}
