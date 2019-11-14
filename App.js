import { AppLoading } from 'expo'
import { Asset } from 'expo-asset'
import * as Font from 'expo-font'
import React, { useState } from 'react'
import { Provider } from 'react-redux'
import { Platform, StatusBar, StyleSheet, View } from 'react-native'
import { FontAwesome } from '@expo/vector-icons'
import configureStore from './store/configureStore'
import AppNavigator from './navigation/AppNavigator'
import Spinner from 'react-native-loading-spinner-overlay'
import { connect } from 'react-redux'
import axios from 'axios'
import Colors from './constants/Colors'

const rootStateToProps = state => ({
  loading: state.general.loading
})

const RootScreen = connect(rootStateToProps)(({ loading }) => {
  return (
    <View style={styles.container}>
      {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
      {/* <Spinner
        visible={loading}
        textContent={'Loading...'}
        textStyle={styles.spinnerTextStyle}
        cancelable={true}
        animation="fade"
        overlayColor="rgba(0, 0, 0, 0.8)"
      /> */}
      <AppNavigator />
    </View>
  )
})

export default function App(props) {
  const [isLoadingComplete, setLoadingComplete] = useState(false)
  const [store, setStore] = useState(null)
  const [storeReady, setStoreReady] = useState(false)
  if (!store) {
    setStore(configureStore(() => setStoreReady(true)))
  }

  if (storeReady) addAxiosToken(store)

  if (!isLoadingComplete && !storeReady && !props.skipLoadingScreen) {
    return (
      <AppLoading
        startAsync={loadResourcesAsync}
        onError={handleLoadingError}
        onFinish={() => handleFinishLoading(setLoadingComplete)}
      />
    )
  } else {
    return (
      <Provider store={store}>
        <RootScreen />
      </Provider>
    )
  }
}

async function loadResourcesAsync() {
  await Promise.all([
    Asset.loadAsync([
      require('./assets/images/robot-dev.png'),
      require('./assets/images/robot-prod.png'),
    ]),
    Font.loadAsync({
      // This is the font that we are using for our tab bar
      // ...Ionicons.font,
      ...FontAwesome.font,
      // We include SpaceMono because we use it in HomeScreen.js. Feel free to
      // remove this if you are not using it in your app
      'space-mono': require('./assets/fonts/SpaceMono-Regular.ttf'),
    }),
  ]);
}

function handleLoadingError(error) {
  // In this case, you might want to report the error to your error reporting
  // service, for example Sentry
  console.warn(error)
}

function handleFinishLoading(setLoadingComplete) {
  setLoadingComplete(true)
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
  },
  spinnerTextStyle: {
    color: '#fff',
  },
})
