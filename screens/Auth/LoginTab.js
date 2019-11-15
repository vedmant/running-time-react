import React, { useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { TextField } from 'react-native-material-textfield'
import Toast from 'react-native-root-toast'
import { login } from '../../actions/auth'
import Button from '../../components/Button'
import Panel from '../../components/Panel'

const initialErrors = { email: [], password: [] }
const initialValues = { email: 'user@gmail.com', password: '123456' }

export default LoginTab = ({ dispatch, navigation }) => {
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({ ...initialValues })
  const [errors, setErrors] = useState(initialErrors)

  const updateForm = data => setForm(Object.assign(form, data))

  const onSubmit = async () => {
    setLoading(true)
    try {
      await dispatch(login(form))
      Toast.show('Successfully logged in')
      navigation.navigate('Main')
    } catch (e) {
      if (e.response && e.response.data && e.response.data.errors) {
        setErrors({ ...initialErrors, ...e.response.data.errors })
      } else {
        setErrors({ ...initialErrors, email: [e.response.data.message] })
      }
      Toast.show(e.response.data.message)
      setLoading(false)
    }
  }

  return (
    <View style={styles.scene}>
      <Panel>
        <TextField
          label='Email'
          onChangeText={val => updateForm({ email: val })}
          value={form.email}
          error={errors.email[0]}
          autoCompleteType="email"
        />
        <TextField
          label='Password'
          onChangeText={val => updateForm({ password: val })}
          value={form.password}
          error={errors.password[0]}
          autoCompleteType='password'
          secureTextEntry={true}
        />
        <View style={{ paddingTop: 20 }} />
        <Button onPress={onSubmit} isLoading={loading}>Login</Button>
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
