import { AppRegistry, LogBox } from 'react-native'
import App from './src/App'
import { name as appName } from './app.json'

if (__DEV__) {
  LogBox.ignoreLogs(['Require cycle:'])
  import('./src/ReactotronConfig').then(() =>
    console.log('Reactotron Configured'),
  )
}

AppRegistry.registerComponent(appName, () => App)
