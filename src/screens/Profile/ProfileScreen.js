import React from 'react'
import { ScrollView, StyleSheet } from 'react-native'
import ProfileForm from './ProfileForm'
import Colors from '@/constants/Colors'
import { Button } from 'react-native-paper'
import { useAuthStore } from '@/stores/auth'
import { useNavigation } from '@react-navigation/native'
import { SignOut } from 'phosphor-react-native'

export default function () {
  const navigation = useNavigation()

  return (
    <ScrollView style={styles.container}>
      <Button
        mode="contained"
        style={{ marginBottom: 20 }}
        icon={() => <SignOut weight={'bold'} size={18} color={'white'} />}
        onPress={() => {
          useAuthStore.getState().logout()
        }}>
        Logout
      </Button>
      <ProfileForm
        message="Successfully updated profile"
        button="Update"
      />
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: Colors.pageBackground,
  },
})
