import axios from 'axios'
import React, { useState } from 'react'
import { Platform, StatusBar, StyleSheet, View, Text } from 'react-native'
import { Provider } from 'react-redux'
import Colors from './constants/Colors'
import AppNavigator from './navigation/AppNavigator'
import { Provider as PaperProvider } from 'react-native-paper'
import AwesomeIcon from 'react-native-vector-icons/FontAwesome'
import Theme from './constants/Theme'
import Push from 'appcenter-push'

let configureStore
if (__DEV__) configureStore = require('./store/configureStoreDev').default
else configureStore = require('./store/configureStore').default

export default function App(props) {
  const [store, setStore] = useState(null)
  const [storeReady, setStoreReady] = useState(false)
  const [addedToken, setAddedToken] = useState(false)
  if (!store) {
    setStore(configureStore(() => setStoreReady(true)))
  }

  if (storeReady && !addedToken) addAxiosToken(store) && setAddedToken(true)

  if (!storeReady) {
    return (
      <View><Text>Loading...</Text></View>
    )
  } else {
    return (
      <Provider store={store}>
        <PaperProvider
          theme={Theme}
          settings={{
            icon: props => <AwesomeIcon {...props} />,
          }}>
          <View style={styles.container}>
            {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
            <AppNavigator />
          </View>
        </PaperProvider>
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

Push.setListener({
  onPushNotificationReceived: function (pushNotification) {
    let message = pushNotification.message
    let title = pushNotification.title

    if (message === null) {
      // Android messages received in the background don't include a message. On Android, that fact can be used to
      // check if the message was received in the background or foreground. For iOS the message is always present.
      title = 'Android background'
      message = '<empty>'
    }

    // Custom name/value pairs set in the App Center web portal are in customProperties
    if (pushNotification.customProperties && Object.keys(pushNotification.customProperties).length > 0) {
      message += '\nCustom properties:\n' + JSON.stringify(pushNotification.customProperties)
    }

    if (AppState.currentState === 'active') {
      Alert.alert(title, message)
    } else {
      // Sometimes the push callback is received shortly before the app is fully active in the foreground.
      // In this case you'll want to save off the notification info and wait until the app is fully shown
      // in the foreground before displaying any UI. You could use AppState.addEventListener to be notified
      // when the app is fully in the foreground.
    }
  }
})

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.pageBackground,
  }
})
