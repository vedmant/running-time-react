import React, { useState } from 'react'
import { View, StyleSheet, Button } from 'react-native'
import { Formik } from 'formik'
import { TextField } from 'react-native-material-textfield'
import { login } from '../../actions/auth'
import Toast from 'react-native-root-toast'
import Panel from '../../components/Panel'

const initialErrors = { email: [], password: [] }
const initialValues = { email: 'user@gmail.com', password: '123456' }

export default LoginTab = ({ dispatch, navigation, loading }) => {
  const [errors, setErrors] = useState(initialErrors)

  const onSubmit = async values => {
    try {
      await dispatch(login(values))
      Toast.show('Successfully logged in')
      navigation.navigate('Main')
    } catch (e) {
      if (e.response && e.response.data && e.response.data.errors) {
        setErrors({ ...initialErrors, ...e.response.data.errors })
      } else {
        setErrors({ ...initialErrors, email: [e.response.data.message] })
      }
      Toast.show(e.response.data.message)
    }
  }

  return (
    <View style={styles.scene}>
      <Panel>
        <Formik initialValues={initialValues} onSubmit={onSubmit}>
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
                autoCompleteType='password'
                secureTextEntry={true}
              />
              <View style={{ paddingTop: 20 }} />
              <Button onPress={handleSubmit} title="Login" />
            </View>
          )}
        </Formik>
      </Panel>
    </View>
  )
}

const styles = StyleSheet.create({
  scene: {
    flex: 1,
    padding: 10,
  },
})
