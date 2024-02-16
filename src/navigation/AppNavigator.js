import { createStackNavigator } from '@react-navigation/stack'
import { NavigationContainer } from '@react-navigation/native'
import AuthScreen from '../screens/Auth/AuthScreen'
import MainTabNavigator from './MainTabNavigator'
import AuthLoadingScreen from '@/screens/Auth/AuthLoadingScreen'

const Stack = createStackNavigator()

export default function ApplicationNavigator () {
  const isSignedIn = false

  return (<NavigationContainer>
    <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName={isSignedIn ? 'Main' : 'AuthLoadingScreen'}>
      {isSignedIn ? (
        <>
          <Stack.Screen name="Main" component={MainTabNavigator} />
        </>
      ) : (
        <>
          <Stack.Screen name="Auth" component={AuthScreen} />
          <Stack.Screen name="AuthLoadingScreen" component={AuthLoadingScreen} />
        </>
      )}
    </Stack.Navigator>
  </NavigationContainer>)
}

