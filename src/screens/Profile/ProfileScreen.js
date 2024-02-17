import React from 'react'
import { StyleSheet } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import ProfileForm from './ProfileForm'
import Colors from '../../constants/Colors'
import { Button } from 'react-native-paper'
import { useAuthStore } from '@/stores/auth'

export default function ProfileScreen (props) {
  return (
    <KeyboardAwareScrollView style={styles.container} enableOnAndroid>
      <Button
        mode="contained"
        style={{ marginBottom: 20 }}
        icon="sign-out"
        onPress={() => {
          useAuthStore.getState().logout()
          props.navigation.navigate('Auth')
        }}>
        Logout
      </Button>
      <ProfileForm
        {...props}
        message="Successfully updated profile"
        button="Update"
      />
    </KeyboardAwareScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: Colors.pageBackground,
  },
})
