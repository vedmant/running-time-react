import { useState } from 'react'
import { useWindowDimensions } from 'react-native'
import LoginTab from './LoginTab'
import RegisterTab from './RegisterTab'
import { TabView, SceneMap, TabBar } from 'react-native-tab-view'

const renderScene = SceneMap({
  login: LoginTab,
  register: RegisterTab,
})


const renderTabBar = props => (
  <TabBar
    {...props}
    // indicatorStyle={{ backgroundColor: 'white' }}
    className="bg-indigo-600 text-white"
  />
)

export default function () {
  const layout = useWindowDimensions()

  const [index, setIndex] = useState(0)
  const [routes] = useState([
    { key: 'login', title: 'Login' },
    { key: 'register', title: 'Register' },
  ])

  return (
    <TabView
      navigationState={{ index, routes }}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={{ width: layout.width }}
      renderTabBar={renderTabBar}
    />
  )
}
