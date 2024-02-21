import React, { useEffect, useState } from 'react'
import { Dimensions, RefreshControl, StyleSheet, Text, View, ScrollView } from 'react-native'
import { LineChart } from 'react-native-chart-kit'
import Panel from '@/components/Panel'
import Colors from '@/constants/Colors'
import EntryForm from '../Entries/EntryForm'
import { useGeneralStore } from '@/stores/general'

export default function () {
  const [loading, setLoading] = useState(false)
  const [booted, setBooted] = useState(false)
  const dashboard = useGeneralStore(s => s.dashboard)
  const loadDashboard = useGeneralStore(s => s.loadDashboard)

  const dispatchLoadDashboard = async () => {
    setLoading(true)
    await loadDashboard()
    setLoading(false)
  }

  if (!booted) {
    dispatchLoadDashboard()
    setBooted(true)
  }

  const onRefresh = () => {
    dispatchLoadDashboard()
  }

  return (
    <ScrollView
      style={{ backgroundColor: Colors.pageBackground }}
      contentContainerStyle={styles.container}
      refreshControl={
        <RefreshControl onRefresh={onRefresh} refreshing={loading} />
      }>
      <Panel header="This week">
        <Text>
          <Text>Records: </Text>
          <Text style={styles.value}>{dashboard.weekly_count}</Text>
        </Text>
        <Text>
          <Text>Average speed: </Text>
          <Text style={styles.value}>
            {Math.round((dashboard.weekly_avg_speed || 0) * 10) / 10} km/h
          </Text>
        </Text>
        <Text>
          <Text>Average pace: </Text>
          <Text style={styles.value}>
            {Math.round((dashboard.weekly_avg_pace || 0) * 10) / 10} min/km
          </Text>
        </Text>
      </Panel>
      <Panel header="Best results">
        <Text>
          <Text>Best speed: </Text>
          <Text style={styles.value}>
            {Math.round(dashboard.max_speed * 10) / 10} km/h
          </Text>
        </Text>
        <Text>
          <Text>Longest distance: </Text>
          <Text style={styles.value}>{dashboard.max_distance || 0} km</Text>
        </Text>
        <Text>
          <Text>Longest run: </Text>
          <Text style={styles.value}>{dashboard.max_time || 0}</Text>
        </Text>
      </Panel>
      {dashboard?.week_chart?.length ? (
        <Panel header="My Performance" bodyStyle={{ padding: 0 }}>
          <LineChart
            data={{
              labels: dashboard.week_chart.map(i => i[0]),
              datasets: [
                {
                  color: (opacity = 1) => `rgba(220, 57, 18, ${opacity})`,
                  data: dashboard.week_chart.map(i => i[1]),
                },
                {
                  color: (opacity = 1) => `rgba(51, 102, 204, ${opacity})`,
                  data: dashboard.week_chart.map(i => i[2]),
                },
              ],
            }}
            width={Dimensions.get('window').width - 25} // from react-native
            height={220}
            yAxisLabel={''}
            yAxisSuffix={' km'}
            paddingLeft={0}
            chartConfig={{
              backgroundColor: '#fff',
              backgroundGradientFrom: '#fff',
              backgroundGradientTo: '#fff',
              decimalPlaces: 0, // optional, defaults to 2dp
              color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
              labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
              propsForDots: {
                r: '6',
                strokeWidth: '2',
                stroke: '#ffa726',
              },
            }}
            bezier
            style={{
              marginVertical: 8,
              borderRadius: 16,
            }}
          />
          <View style={{ alignItems: 'center', flex: 1 }}>
            <View style={{ width: 150 }}>
              <View style={styles.legendRow}>
                <View
                  style={[
                    styles.legendDot,
                    { backgroundColor: 'rgb(220, 57, 18)' },
                  ]}
                />
                <Text> - Speed</Text>
              </View>
              <View style={[styles.legendRow, { paddingBottom: 15 }]}>
                <View
                  style={[
                    styles.legendDot,
                    { backgroundColor: 'rgb(51, 102, 204)' },
                  ]}
                />
                <Text> - Distance</Text>
              </View>
            </View>
          </View>
        </Panel>
      ) : null}
      <Panel header="Add new Time Record">
        <EntryForm />
      </Panel>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.pageBackground,
    padding: 10,
  },
  value: {
    fontWeight: 'bold',
  },
  legendRow: {
    paddingLeft: 15,
    paddingRight: 15,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  legendDot: {
    width: 15,
    height: 15,
    borderRadius: 15,
  },
})
