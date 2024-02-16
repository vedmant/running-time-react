import React, { useEffect } from 'react'
import { View, StyleSheet, ActivityIndicator } from 'react-native'
import Colors from '../../constants/Colors'
import { useAuthStore } from '@/stores/auth'

export default function AuthLoadingScreen ({ navigation }) {
  useEffect(() => {
    (async () => {
      try {
        await useAuthStore.getState().checkLogin()
        navigation.navigate('Main')
      } catch (e) {
        navigation.navigate('Auth')
      }
    })()
  })

  return (
    <View style={styles.container}>
      <ActivityIndicator animating size="large" />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.pageBackground,
    alignItems: 'center',
    justifyContent: 'center',
  },
})
