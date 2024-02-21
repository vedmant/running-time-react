import React, { useEffect } from 'react'
import { View, StyleSheet, ActivityIndicator } from 'react-native'
import Colors from '@/constants/Colors'
import { useAuthStore } from '@/stores/auth'
import { useNavigation } from '@react-navigation/native'

export default function () {
  const navigation = useNavigation()

  useEffect(() => {
    console.log('AuthLoadingScreen');

    (async () => {
      useAuthStore.getState().setAxios()

      if (! (await useAuthStore.getState().checkLogin())) {
        console.log('no user')
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
