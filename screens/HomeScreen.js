import React from 'react';
import { Image, Platform, ScrollView, StyleSheet, Text, TouchableOpacity, View, } from 'react-native';

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text>Dashboard</Text>
    </View>
  )
}

HomeScreen.navigationOptions = {
  title: 'Dashboard',
  // header: null,
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
})
