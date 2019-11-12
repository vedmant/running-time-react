import { ExpoConfigView } from '@expo/samples'
import React from 'react'
import { StyleSheet, View, Button } from 'react-native'
import { logout } from '../actions/auth'
import { connect } from 'react-redux'

function SettingsScreen({ dispatch, navigation }) {
  return (
    <View style={styles.container}>
      <Button onPress={() => {
        dispatch(logout())
        navigation.navigate('Auth')
      }} title="Logout" />
      <ExpoConfigView />
    </View>
  )
}

SettingsScreen.navigationOptions = {
  title: 'app.json',
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#f5f8fa',
  },
})


export default connect()(SettingsScreen)
