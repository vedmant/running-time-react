import dayjs from 'dayjs'
import { useEffect, useState } from 'react'
import { Alert, FlatList, RefreshControl, StyleSheet, Text, View, ActivityIndicator } from 'react-native'
import Panel from '@/components/Panel'
import SmallButton from '@/components/SmallButton'
import Colors from '@/constants/Colors'
import { Pencil, Plus, Trash } from 'phosphor-react-native'
import { useEntriesStore } from '@/stores/entries'
import { useNavigation } from '@react-navigation/native'
import Button from '@/components/Button'

export default function () {
  const navigation = useNavigation()
  const entries = useEntriesStore(s => s.entries)
  const [loading, setLoading] = useState(false)
  const [loadingMore, setLoadingMore] = useState(false)

  async function loadEntries () {
    setLoading(true)
    await useEntriesStore.getState().loadEntries()
    setLoading(false)
  }

  async function loadMore () {
    if (!loadingMore && entries.current_page < entries.last_page) {
      setLoadingMore(true)
      await useEntriesStore.getState().loadMoreEntries({ page: entries.current_page + 1 })
      setLoadingMore(false)
    }
  }

  useEffect(() => {
    loadEntries()
  }, [])

  async function onDeleteItem (item) {
    Alert.alert('Delete', 'Are you sure you want to delete this item?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'OK',
        onPress: async () => {
          await useEntriesStore.getState().deleteEntry(item.id)
          loadEntries()
        },
      },
    ])
  }

  function renderItem (item) {
    return (
      <Panel style={styles.item} className="mb-2">
        <View style={{ flex: 1, flexDirection: 'row' }}>
          <View style={{ flex: 1 }}>
            <Text style={styles.distance}>
              Date: {dayjs(item.date).format('MM/DD/YY')}
            </Text>
            <Text style={styles.distance}>Distance: {item.distance} km</Text>
            <Text style={styles.distance}>Time: {item.time}</Text>
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.distance}>
              Avg. Speed: {Math.round(item.speed * 10) / 10}
            </Text>
            <Text style={styles.distance}>
              Avg. Pace: {Math.round(item.pace * 10) / 10}
            </Text>
          </View>
          <View
            style={styles.actionButtons}>
            <SmallButton
              onPress={() => navigation.navigate('EditEntry', { item })}
            >
              <Pencil size={14} color={'white'} />
            </SmallButton>
            <SmallButton onPress={() => onDeleteItem(item)} type="danger">
              <Trash size={14} color={'white'} />
            </SmallButton>
          </View>
        </View>
      </Panel>
    )
  }

  function renderFooter () {
    if (!loadingMore) {
      return null
    }

    return (
      <View
        style={styles.loadingView}>
        <ActivityIndicator animating size="large" />
      </View>
    )
  }

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={entries.data}
        style={{ backgroundColor: Colors.pageBackground }}
        contentContainerStyle={styles.container}
        renderItem={({ item }) => renderItem(item)}
        keyExtractor={item => item.id + ''}
        refreshControl={
          <RefreshControl
            onRefresh={loadEntries}
            refreshing={loading}
          />
        }
        onEndReached={loadMore}
        onEndReachedThreshold={0.5}
        ListFooterComponent={renderFooter}
        ListEmptyComponent={
          loading ? null : (
            <View style={{ alignItems: 'center' }}>
              <Text>The list is empty</Text>
            </View>
          )
        }
      />
      <Button
        className="shadow-lg absolute bottom-0 right-0 m-4"
        icon={<Plus className="ml-1" size={24} color={'white'} weight={'bold'} />}
        onPress={() => navigation.navigate('AddEntry')}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 10,
    backgroundColor: Colors.pageBackground,
  },
  addButton: {
    backgroundColor: Colors.primary,
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  },
  actionButtons: {
    alignItems: 'flex-start',
    justifyContent: 'flex-center',
    flexDirection: 'col',
    gap: 5,
  },
  loadingView: {
    flex: 1,
    paddingVertical: 10,
    marginTop: 10,
    marginBottom: 10,
  },
  item: {},
  distance: {},
})
