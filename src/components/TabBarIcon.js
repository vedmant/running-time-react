import FontAwesome from 'react-native-vector-icons/FontAwesome'
import React from 'react'
import Colors from '../constants/Colors'

export default function TabBarIcon (props) {
  return (
    <FontAwesome
      name={props.name}
      size={26}
      style={{ marginBottom: -3 }}
      color={props.focused ? Colors.tabIconSelected : Colors.tabIconDefault}
    />
  )
}
