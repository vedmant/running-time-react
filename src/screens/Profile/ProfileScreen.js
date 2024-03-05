import React from 'react'
import { ScrollView, StyleSheet } from 'react-native'
import ProfileForm from './ProfileForm'
import Colors from '@/constants/Colors'
import { useAuthStore } from '@/stores/auth'
import { SignOut } from 'phosphor-react-native'
import Button from '@/components/Button'

export default function () {
  return (
    <ScrollView style={styles.container}>
      <Button
        label="Logout"
        className="mb-4"
        icon={<SignOut weight={'bold'} size={18} color={'white'} />}
        onPress={() => {
          useAuthStore.getState().logout()
        }}
      />
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
