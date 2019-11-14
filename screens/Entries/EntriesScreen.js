import dayjs from 'dayjs'
import React, { Component } from 'react'
import { Alert, FlatList, RefreshControl, StyleSheet, Text, View, ActivityIndicator } from 'react-native'
import { connect } from 'react-redux'
import { deleteEntry, loadEntries, loadMoreEntries } from '../../actions/entries'
import Panel from '../../components/Panel'
import SmallButton from '../../components/SmallButton'
import Colors from '../../constants/Colors'

class Entries extends Component {
  navigationOptions = {
    title: 'Entries',
  }

  state = {
    loading: false,
    loadingMore: false,
  }

  componentDidMount() {
    this.dispatchWithLoading(loadEntries())
  }

  async dispatchWithLoading(action) {
    this.setState({ loading: true })
    await this.props.dispatch(action)
    this.setState({ loading: false })
  }

  async loadMore() {
    if (!this.state.loadingMore && this.props.entries.current_page < this.props.entries.last_page) {
      this.setState({ loadingMore: true })
      await this.props.dispatch(loadMoreEntries({ page: this.props.entries.current_page + 1 }))
      this.setState({ loadingMore: false })
    }
  }

  async onDeleteItem(item) {
    Alert.alert(
      'Delete',
      'Are you sure you want to delete this item?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'OK', onPress: async () => {
            await this.dispatchWithLoading(deleteEntry(item.id))
            this.dispatchWithLoading(loadEntries())
          }
        },
      ]
    )
  }

  renderItem(item) {
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
              <SmallButton icon="pencil" onPress={() => console.log('press')} style={{ marginRight: 5 }} />
              <SmallButton icon="trash" onPress={() => this.onDeleteItem(item)} type="danger" />
            </View>
          </View>
        </View>
      </Panel>
    )
  }

  renderFooter = () => {
    if (!this.state.loadingMore) return null

    return (
      <View
        style={{
          flex: 1,
          paddingVertical: 10,
          marginTop: 10,
          marginBottom: 10,
        }}
      >
        <ActivityIndicator animating size="large" />
      </View>
    )
  }

  render() {
    return (
      <FlatList data={this.props.entries.data} style={{ backgroundColor: Colors.pageBackground }} contentContainerStyle={styles.container}
        renderItem={({ item }) => this.renderItem(item)}
        keyExtractor={item => item.id + ''}
        refreshControl={<RefreshControl onRefresh={() => this.dispatchWithLoading(loadEntries())} refreshing={this.state.loading} />}
        onEndReached={() => this.loadMore()}
        onEndReachedThreshold={0.5}
        ListFooterComponent={this.renderFooter}
      />
    )
  }
}

const styles = StyleSheet.create({
  container: {
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 10,
    backgroundColor: Colors.pageBackground,
  },
  item: {},
  distance: {},
})

export default connect(state => ({
  loading: state.general.loading,
  entries: state.entries.entries,
}))(Entries)
