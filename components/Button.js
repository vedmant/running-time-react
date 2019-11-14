import React from 'react'
import { StyleSheet } from 'react-native'
import Button from 'apsl-react-native-button'

export default function Panel({ children, ...props }) {
  return (
    <Button style={styles.button} {...props} textStyle={styles.text}>
      {children}
    </Button>
  )
}

const styles = StyleSheet.create({
  button: {
    borderColor: '#2a88bd',
    backgroundColor: '#3097d1',
  },
  text: {
    color: 'white',
  }
})
