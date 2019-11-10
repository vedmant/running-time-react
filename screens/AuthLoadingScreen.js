import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { ScrollView, StyleSheet, Text } from 'react-native'
import { checkLogin } from '../actions/auth'

function AuthLoadingScreen({ dispatch, navigation, me }) {
  useEffect(() => {
    setTimeout(() => {
      dispatch(checkLogin()).catch((e) => {
        console.log(e)
        navigation.navigate('Auth')
      })
      // navigation.navigate('Home')
    }, 500)
  }, [])

  return (
    <ScrollView style={styles.container}>
      <Text>Loading</Text>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff',
  },
})

export default connect(state => ({
  me: state.auth.me,
}))(AuthLoadingScreen)
