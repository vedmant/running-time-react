import { createStackNavigator } from '@react-navigation/stack'
import { NavigationContainer } from '@react-navigation/native'
import AuthScreen from '../screens/Auth/AuthScreen'
import MainTabNavigator from './MainTabNavigator'
import AuthLoadingScreen from '@/screens/Auth/AuthLoadingScreen'
import { useAuthStore } from '@/stores/auth'

const Stack = createStackNavigator()

export default function ApplicationNavigator () {
  const user = useAuthStore(s => s.me)

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName={user ? 'Main' : 'AuthLoadingScreen'}>
        {user ? (
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

