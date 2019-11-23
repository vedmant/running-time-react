import FontAwesome from 'react-native-vector-icons/FontAwesome'
import React from 'react'
import { StyleSheet, TouchableHighlight, View } from 'react-native'

export default function Panel ({
  type = 'primary',
  icon,
  children,
  style,
  ...props
}) {
  return (
    <TouchableHighlight style={[styles.button, styles[type], style]} {...props}>
      <View>
        {icon && <FontAwesome name={icon} size={15} color="white" />}
        {children}
      </View>
    </TouchableHighlight>
  )
}

const styles = StyleSheet.create({
  button: {
    width: 25,
    height: 25,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
  primary: {
    backgroundColor: '#3097d1',
    borderColor: '#2a88bd',
  },
  danger: {
    backgroundColor: '#bf5329',
    borderColor: '#aa4a24',
  },
})
