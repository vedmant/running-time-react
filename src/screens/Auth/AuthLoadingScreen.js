import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { View, StyleSheet, Text } from 'react-native'
import { checkLogin } from '../../actions/auth'

const stateToProps = state => ({
  me: state.auth.me,
  accessToken: state.auth.accessToken,
})

export default connect(stateToProps)(({ dispatch, navigation, accessToken }) => {
  useEffect(() => {
    dispatch(checkLogin())
      .then(() => navigation.navigate('Main'))
      .catch(() => navigation.navigate('Auth'))
  }, [])

  return (
    <View style={styles.container}>
    </View>
  )
})

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
  },
})
