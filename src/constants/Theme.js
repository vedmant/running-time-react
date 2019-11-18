import { DefaultTheme } from 'react-native-paper'
import Colors from './Colors'

export default {
  ...DefaultTheme,
  roundness: 2,
  colors: {
    ...DefaultTheme.colors,
    primary: Colors.primary,
    accent: '#f1c40f',
  },
}
