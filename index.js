import { AppRegistry } from 'react-native'
import App from './src/App'
import { name as appName } from './app.json'
import codePush from 'react-native-code-push'

if (__DEV__) {
  // A patch to disable Require cycle warnings
  const origWarn = console.warn
  console.warn = message => {
    if (/^Require cycle: node_modules/.test(message)) return
    origWarn(message)
  }

  import('./ReactotronConfig').then(() => console.log('Reactotron Configured'))
} else {
  codePush.sync({
    updateDialog: true,
    installMode: codePush.InstallMode.IMMEDIATE
  })
}

AppRegistry.registerComponent(appName, () => codePush(App))
