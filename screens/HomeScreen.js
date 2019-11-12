import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { ScrollView, StyleSheet, Text, RefreshControl, View, Dimensions } from 'react-native'
import { loadDashboard } from '../actions/general'
import Panel from '../components/Panel'
import { LineChart } from 'react-native-chart-kit'

function HomeScreen({ dispatch, dashboard, loading }) {
  const dashboardLoaded = Object.keys(dashboard).length !== 0

  useEffect(() => {
    if (!dashboardLoaded) dispatch(loadDashboard())
  }, [])

  const onRefresh = React.useCallback(() => {
    dispatch(loadDashboard())
  })

  return (dashboardLoaded &&
    <ScrollView contentContainerStyle={styles.container}
      refreshControl={<RefreshControl onRefresh={onRefresh} refreshing={loading} />}>
      <Panel header="This week">
        <Text>
          <Text>Records: </Text>
          <Text style={styles.value}>{dashboard.weekly_count}</Text>
        </Text>
        <Text>
          <Text>Average speed: </Text>
          <Text style={styles.value}>{dashboard.weekly_avg_speed || 0} km/h</Text>
        </Text>
        <Text>
          <Text>Average pace: </Text>
          <Text style={styles.value}>{dashboard.weekly_avg_pace || 0} min/km</Text>
        </Text>
      </Panel>
      <Panel header="Best results">
        <Text>
          <Text>Best speed: </Text>
          <Text style={styles.value}>{Math.round(dashboard.max_speed * 10) / 10} km/h</Text>
        </Text>
        <Text>
          <Text>Longest distance: </Text>
          <Text style={styles.value}>{dashboard.max_distance} km</Text>
        </Text>
        <Text>
          <Text>Longest run: </Text>
          <Text style={styles.value}>{dashboard.max_time}</Text>
        </Text>
      </Panel>
      <Panel header="My Performance">
        <LineChart
          data={{
            labels: ["January", "February", "March", "April", "May", "June"],
            datasets: [
              {
                data: [
                  Math.random() * 100,
                  Math.random() * 100,
                  Math.random() * 100,
                  Math.random() * 100,
                  Math.random() * 100,
                  Math.random() * 100
                ]
              }
            ]
          }}
          width={Dimensions.get('window').width - 55} // from react-native
          height={220}
          yAxisLabel={''}
          yAxisSuffix={''}
          chartConfig={{
            backgroundColor: '#e26a00',
            backgroundGradientFrom: '#fb8c00',
            backgroundGradientTo: '#ffa726',
            decimalPlaces: 2, // optional, defaults to 2dp
            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            style: {
              borderRadius: 16,
            },
            propsForDots: {
              r: '6',
              strokeWidth: '2',
              stroke: '#ffa726',
            }
          }}
          bezier
          style={{
            marginVertical: 8,
            borderRadius: 16,
          }}
        />
      </Panel>
      <Panel header="Add new Time Record">
      </Panel>
    </ScrollView>
  )
}

HomeScreen.navigationOptions = {
  title: 'Dashboard',
  // header: null,
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f5f8fa',
    padding: 10,
  },
  value: {
    fontWeight: 'bold',
  }
})

export default connect(state => ({
  loading: state.general.loading,
  dashboard: state.general.dashboard,
}))(HomeScreen)
