import axios from 'axios'
import React, { useState } from 'react'
import { Platform, StatusBar, StyleSheet, View, Text } from 'react-native'
import { Provider } from 'react-redux'
import Colors from './constants/Colors'
import AppNavigator from './navigation/AppNavigator'
import configureStore from './store/configureStore'

export default function App(props) {
  const [store, setStore] = useState(null)
  const [storeReady, setStoreReady] = useState(false)
  if (!store) {
    setStore(configureStore(() => setStoreReady(true)))
  }

  if (storeReady) addAxiosToken(store)

  if (!storeReady) {
    return (
      <View><Text>Loading...</Text></View>
    )
  } else {
    return (
      <Provider store={store}>
        <View style={styles.container}>
          {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
          <AppNavigator />
        </View>
      </Provider>
    )
  }
}

function addAxiosToken(store) {
  // Authorization header
  axios.interceptors.request.use(function (config) {
    config['headers'] = {
      Authorization: 'Bearer ' + store.getState().auth.accessToken,
      Accept: 'application/json',
    }
    return config
  }, error => Promise.reject(error))
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.pageBackground,
  }
})
