import React from 'react'
import { StyleSheet, useWindowDimensions } from 'react-native'
import LoginTab from './LoginTab'
import RegisterTab from './RegisterTab'
import Colors from '../../constants/Colors'
import { TabView, SceneMap } from 'react-native-tab-view'

const renderScene = SceneMap({
  login: LoginTab,
  register: RegisterTab,
})

export default function TabViewExample () {
  const layout = useWindowDimensions()

  const [index, setIndex] = React.useState(0)
  const [routes] = React.useState([
    { key: 'login', title: 'Login' },
    { key: 'register', title: 'Register' },
  ])

  return (
    <TabView
      navigationState={{ index, routes }}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={{ width: layout.width }}
    />
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // paddingTop: StatusBar.currentHeight,
    backgroundColor: Colors.pageBackground,
  },
})
