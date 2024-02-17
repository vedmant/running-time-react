import React from 'react'
import { StyleSheet, View } from 'react-native'
import Panel from '../../components/Panel'
import Colors from '../../constants/Colors'
import EntryForm from './EntryForm'

function AddEntryScreen ({ dispatch, navigation }) {
  return (
    <View style={styles.container}>
      <Panel>
        <EntryForm dispatch={dispatch} onSuccess={() => navigation.goBack()} />
      </Panel>
    </View>
  )
}

AddEntryScreen.navigationOptions = {
  title: 'Add Entry',
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: Colors.pageBackground,
  },
})

export default AddEntryScreen
