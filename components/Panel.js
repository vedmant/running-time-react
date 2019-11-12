import React from 'react'
import { Text, View, StyleSheet } from 'react-native'

export default function Panel({ header, children }) {
  return (
    <View style={styles.container}>
      {header && <View style={styles.header}>
        <Text>{header}</Text>
      </View>}
      <View style={styles.body}>
        {children}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: '#d3e0e9',
    borderStyle: 'solid',
    borderRadius: 5,
    marginBottom: 10,
    backgroundColor: '#fff',
  },
  header: {
    borderBottomWidth: 1,
    borderBottomColor: '#d3e0e9',
    borderStyle: 'solid',
    padding: 10,
    fontSize: 20,
    fontWeight: 'bold',
  },
  body: {
    padding: 10,
  },
})
