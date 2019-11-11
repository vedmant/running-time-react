import React, { useState } from 'react'
import { View, Button, StyleSheet } from 'react-native'
import { Formik } from 'formik'
import { TextField } from 'react-native-material-textfield'
import { register } from '../../actions/auth'
import Toast from 'react-native-root-toast'

export default RegisterTab = ({ dispatch, navigation }) => {
  const initialErrors = { name: [], email: [], password: [], password_confirmation: [] }
  const initialValues = { name: 'Test', email: 'user@gmail.com', password: '123456', password_confirmation: '123456' }

  const [errors, setErrors] = useState(initialErrors)

  const onSubmit = async values => {
    try {
      await dispatch(register(values))
      Toast.show('Successfully registered')
      navigation.navigate('Main')
    } catch (e) {
      if (e.response && e.response.data && e.response.data.errors) {
        setErrors({ ...initialErrors, ...e.response.data.errors })
      } else {
        setErrors({ ...initialErrors, name: [e.response.data.message] })
      }
      Toast.show(e.response.data.message)
    }
  }

  return (
    <View style={styles.scene}>
      <Formik initialValues={initialValues} onSubmit={onSubmit}>
        {({ handleChange, handleBlur, handleSubmit, values }) => (
          <View>
            <TextField
              label='Name'
              onChangeText={handleChange('name')}
              onBlur={handleBlur('name')}
              value={values.name}
              autoCompleteType="name"
              error={errors.name[0]}
            />
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
            <TextField
              label='Password confirmation'
              onChangeText={handleChange('password_confirmation')}
              onBlur={handleBlur('password_confirmation')}
              value={values.password_confirmation}
              error={errors.password_confirmation[0]}
              autoCompleteType='password'
              secureTextEntry={true}
            />
            <View style={{ paddingTop: 20 }} />
            <Button onPress={handleSubmit} title="Register" />
          </View>
        )}
      </Formik>
    </View>
  )
}

const styles = StyleSheet.create({
  scene: {
    flex: 1,
    paddingRight: 20,
    paddingLeft: 20,
  },
})
