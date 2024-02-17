import React from 'react'
import { StyleSheet, View } from 'react-native'
import Panel from '../../components/Panel'
import Colors from '../../constants/Colors'
import EntryForm from './EntryForm'

function EditEntryScreen ({ dispatch, navigation }) {
  return (
    <View style={styles.container}>
      <Panel>
        <EntryForm
          dispatch={dispatch}
          item={navigation.getParam('item')}
          onSuccess={() => navigation.goBack()}
        />
      </Panel>
    </View>
  )
}

EditEntryScreen.navigationOptions = {
  title: 'Edit Entry',
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: Colors.pageBackground,
  },
})

export default EditEntryScreen
