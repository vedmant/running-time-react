import dayjs from 'dayjs'
import React, { useCallback, useEffect } from 'react'
import { FlatList, StyleSheet, Text, View, RefreshControl } from 'react-native'
import { connect } from 'react-redux'
import { loadEntries } from '../actions/entries'
import Panel from '../components/Panel'
import Button from '../components/Button'

function Item({ item }) {
  return (
    <Panel style={styles.item}>
      <View style={{ flex: 1, flexDirection: 'row' }}>
        <View style={{ flex: 1 }}>
          <Text style={styles.distance}>Date: {dayjs(item.date).format('MM/DD/YY')}</Text>
          <Text style={styles.distance}>Distance: {item.distance} km</Text>
          <Text style={styles.distance}>Time: {item.time}</Text>
        </View>
        <View style={{ flex: 1 }}>
          <Text style={styles.distance}>Avg. Speed: {Math.round(item.speed * 10) / 10}</Text>
          <Text style={styles.distance}>Avg. Pace: {Math.round(item.pace * 10) / 10}</Text>
          <View style={{ flex: 1, alignItems: 'flex-start', flexDirection: 'row' }}>
            <Button icon="pencil" onPress={() => console.log('press')} />
            <Button icon="trash" onPress={() => console.log('press')} />
          </View>
        </View>
      </View>
    </Panel>
  );
}

function Entries({ dispatch, entries, loading }) {
  useEffect(() => {
    dispatch(loadEntries())
  }, [])

  const onRefresh = useCallback(() => {
    dispatch(loadEntries())
  })

  return (
    <FlatList data={entries.data} contentContainerStyle={styles.container}
      renderItem={({ item }) => <Item item={item} />}
      keyExtractor={item => item.id}
      refreshControl={<RefreshControl onRefresh={onRefresh} refreshing={loading} />}
    />
  )
}

Entries.navigationOptions = {
  title: 'Entries',
}

const styles = StyleSheet.create({
  container: {
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 10,
    backgroundColor: '#f5f8fa',
  },
  item: {},
  distance: {},
})

export default connect(state => ({
  loading: state.general.loading,
  entries: state.entries.entries,
}))(Entries)
