import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { View, StyleSheet, ActivityIndicator } from 'react-native'
import { checkLogin } from '../../actions/auth'
import Colors from '../../constants/Colors'

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
      <ActivityIndicator animating size="large" />
    </View>
  )
})

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.pageBackground,
    alignItems: 'center',
    justifyContent: 'center',
  },
})
