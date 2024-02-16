import axios from 'axios'
import React from 'react'
import { Platform, StatusBar, StyleSheet, View } from 'react-native'
import Colors from './constants/Colors'
import AppNavigator from './navigation/AppNavigator'
import { Provider as PaperProvider } from 'react-native-paper'
import Theme from './constants/Theme'
// import Push from 'appcenter-push'

// let configureStore
// if (__DEV__) {
//   configureStore = require('./store/configureStoreDev').default
// } else {
//   configureStore = require('./store/configureStore').default
// }

export default function App (props) {
  // const [store, setStore] = useState(null)
  // const [storeReady, setStoreReady] = useState(false)
  // const [addedToken, setAddedToken] = useState(false)
  // if (!store) {
  //   setStore(configureStore(() => setStoreReady(true)))
  // }

  // if (storeReady && !addedToken) {
  //   addAxiosToken(store) && setAddedToken(true)
  // }

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

function addAxiosToken (store) {
  // Authorization header
  axios.interceptors.request.use(
    function (config) {
      config.headers = {
        Authorization: 'Bearer ' + store.getState().auth.accessToken,
        Accept: 'application/json',
      }
      return config
    },
    error => Promise.reject(error),
  )
}

// Push.setListener({
//   onPushNotificationReceived: function (pushNotification) {
//     console.warn(pushNotification)
//     let message = pushNotification.message
//     let title = pushNotification.title
//
//     if (message === null) {
//       // Android messages received in the background don't include a message. On Android, that fact can be used to
//       // check if the message was received in the background or foreground. For iOS the message is always present.
//       title = 'Android background'
//       message = '<empty>'
//     }
//
//     // Custom name/value pairs set in the App Center web portal are in customProperties
//     if (
//       pushNotification.customProperties &&
//       Object.keys(pushNotification.customProperties).length > 0
//     ) {
//       message +=
//         '\nCustom properties:\n' +
//         JSON.stringify(pushNotification.customProperties)
//     }
//   },
// })

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.pageBackground,
  },
})
