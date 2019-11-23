import { AppRegistry, YellowBox } from 'react-native'
import App from './src/App'
import { name as appName } from './app.json'
import codePush from 'react-native-code-push'

if (__DEV__) {
  YellowBox.ignoreWarnings(['Require cycle:'])
  import('./src/ReactotronConfig').then(() =>
    console.log('Reactotron Configured'),
  )
} else {
  codePush.sync({
    updateDialog: true,
    installMode: codePush.InstallMode.IMMEDIATE,
  })
}

AppRegistry.registerComponent(appName, () => codePush(App))
