import React, { useState } from 'react'
import { View, TextInput, Button, StyleSheet, Text, Dimensions, StatusBar } from 'react-native'
import { TabView, SceneMap } from 'react-native-tab-view'
import { Formik } from 'formik'
import { TextField } from 'react-native-material-textfield'
import { connect } from 'react-redux'
import { login } from '../actions/auth'

const LoginTab = connect()(({ dispatch, navigation }) => {
  const initialErrors = { email: [], password: [] }
  const initialValues = { email: 'user@gmail.com', password: '123456' }

  const [errors, setErrors] = useState(initialErrors)

  return (
    <View style={styles.scene}>
      <Formik
        initialValues={initialValues}
        onSubmit={values => {
          setErrors(initialErrors)

          dispatch(login(values))
            .then(() => {
              console.log('loggedin', navigation)
              navigation.navigate('Main')
            })
            .catch(e => {
              if (e.response && e.response.data && e.response.data.errors) {
                setErrors(e.response.data.errors)
              } else {
                setErrors({ ...errors, email: [e.response.data.message] })
              }
            })
        }}
      >
        {({ handleChange, handleBlur, handleSubmit, values }) => (
          <View>
            <TextField
              label='Email'
              onChangeText={handleChange('email')}
              onBlur={handleBlur('email')}
              value={values.email}
              autoCompleteType="email"
              error={errors.email[0]}
            />
            <TextField
              label='Password'
              onChangeText={handleChange('password')}
              onBlur={handleBlur('password')}
              value={values.password}
              error={errors.password[0]}
            />
            <View style={{ paddingTop: 20 }} />
            <Button onPress={handleSubmit} title="Login" />
          </View>
        )}
      </Formik>
    </View>
  )
})

const RegisterTab = () => (
  <View style={[styles.scene, { backgroundColor: '#673ab7' }]}>
    <Text>Test2</Text>
  </View>
)

export default class AuthScreen extends React.Component {
  state = {
    index: 0,
    routes: [
      { key: 'login', title: 'Login' },
      { key: 'register', title: 'Regiter' },
    ],
  }

  render() {
    return (
      <View style={styles.container}>
        <TabView
          navigationState={this.state}
          renderScene={SceneMap({
            login: () => <LoginTab navigation={this.props.navigation} />,
            register: RegisterTab,
          })}
          onIndexChange={index => this.setState({ index })}
          initialLayout={{ width: Dimensions.get('window').width }}
        />
      </View>
    )
  }
}

AuthScreen.navigationOptions = {
  headerShown: false,
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
    backgroundColor: '#fff',
  },
  scene: {
    flex: 1,
    paddingRight: 20,
    paddingLeft: 20,
  },
})
