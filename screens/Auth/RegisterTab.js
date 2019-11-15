import React, { useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { TextField } from 'react-native-material-textfield'
import Toast from 'react-native-root-toast'
import { register } from '../../actions/auth'
import Button from '../../components/Button'
import Panel from '../../components/Panel'
import Colors from '../../constants/Colors'

const initialErrors = { name: [], email: [], password: [], password_confirmation: [] }
const initialValues = { name: 'Test', email: 'user@gmail.com', password: '123456', password_confirmation: '123456' }

export default RegisterTab = ({ dispatch, navigation }) => {
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({ ...initialValues })
  const [errors, setErrors] = useState(initialErrors)

  const updateForm = data => setForm(Object.assign(form, data))

  const onSubmit = async () => {
    setLoading(true)
    try {
      await dispatch(register(form))
      Toast.show('Successfully registered')
      navigation.navigate('Main')
    } catch (e) {
      if (e.response && e.response.data && e.response.data.errors) {
        setErrors({ ...initialErrors, ...e.response.data.errors })
      } else {
        setErrors({ ...initialErrors, name: [e.response.data.message] })
      }
      Toast.show(e.response.data.message)
      setLoading(false)
    }
  }

  return (
    <KeyboardAwareScrollView style={styles.scene} enableOnAndroid>
      <Panel>
        <TextField
          label='Name'
          onChangeText={val => updateForm({ name: val })}
          value={form.name}
          autoCompleteType="name"
          error={errors.name[0]}
        />
        <TextField
          label='Email'
          onChangeText={val => updateForm({ email: val })}
          value={form.email}
          autoCompleteType="email"
          error={errors.email[0]}
        />
        <TextField
          label='Password'
          onChangeText={val => updateForm({ password: val })}
          value={form.password}
          error={errors.password[0]}
          autoCompleteType='password'
          secureTextEntry={true}
        />
        <TextField
          label='Password confirmation'
          onChangeText={val => updateForm({ name: password_confirmation })}
          value={form.password_confirmation}
          error={errors.password_confirmation[0]}
          autoCompleteType='password'
          secureTextEntry={true}
        />
        <View style={{ paddingTop: 20 }} />
        <Button onPress={onSubmit} isLoading={loading}>Login</Button>
      </Panel>
    </KeyboardAwareScrollView>
  )
}

const styles = StyleSheet.create({
  scene: {
    flex: 1,
    padding: 10,
    backgroundColor: Colors.pageBackground,
  },
})
