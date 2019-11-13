import React from 'react'
import { TouchableHighlight, StyleSheet, View } from 'react-native'
import { FontAwesome } from '@expo/vector-icons'

export default function Panel({ icon, children, onPress }) {
  return (
    <TouchableHighlight style={styles.button} onPress={onPress}>
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
    backgroundColor: '#3097d1',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    marginRight: 5,
  },
})
