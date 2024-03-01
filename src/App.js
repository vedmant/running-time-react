import React from 'react'
import { SafeAreaView } from 'react-native'
import AppNavigator from './navigation/AppNavigator'

export default function App () {
  return (
    <SafeAreaView className="flex-1">
      <AppNavigator />
    </SafeAreaView>
  )
}
