import React from 'react'
import { Platform, StatusBar, StyleSheet, View } from 'react-native'
import Colors from './constants/Colors'
import AppNavigator from './navigation/AppNavigator'
import { Provider as PaperProvider } from 'react-native-paper'
import Theme from './constants/Theme'

export default function App (props) {
  return (
    <PaperProvider
      theme={Theme}
      settings={{}}>
      <View style={styles.container}>
        {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
        <AppNavigator />
      </View>
    </PaperProvider>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.pageBackground,
  },
})
