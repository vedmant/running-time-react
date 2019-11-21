/**
 * @format
 */

// A patch to disable Require cycle warnings
if (__DEV__) {
  const origWarn = console.warn

  console.warn = message => {
    if (/^Require cycle: node_modules/.test(message)) return
    origWarn(message)
  }
  import('./ReactotronConfig').then(() => console.log('Reactotron Configured'))
}

import { AppRegistry } from 'react-native'
import App from './src/App'
import { name as appName } from './app.json'

AppRegistry.registerComponent(appName, () => App)
