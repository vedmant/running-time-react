import React from 'react'
import { StyleSheet, View } from 'react-native'
import Panel from '@/components/Panel'
import Colors from '@/constants/Colors'
import EntryForm from './EntryForm'
import { useNavigation } from '@react-navigation/native'

export default function () {
  const navigation = useNavigation()
  return (
    <View style={styles.container}>
      <Panel>
        <EntryForm onSuccess={() => navigation.goBack()} />
      </Panel>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: Colors.pageBackground,
  },
})
