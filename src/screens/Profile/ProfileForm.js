import React, { useState } from 'react'
import { View } from 'react-native'
import Toast from 'react-native-root-toast'
import { updateProfile } from '../../actions/auth'
import Panel from '../../components/Panel'
import { TextInput, Button, HelperText } from 'react-native-paper'

const initialErrors = { name: [], email: [], password: [], password_confirmation: [] }

export default ProfileForm = ({ dispatch, navigation, me }) => {
  const initialValues = { name: me.name, email: me.email, password: '', password_confirmation: '' }

  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({ ...initialValues })
  const [errors, setErrors] = useState(initialErrors)

  const updateForm = data => setForm(Object.assign(form, data))

  const onSubmit = async () => {
    setLoading(true)
    try {
      await dispatch(updateProfile({ id: me.id, form }))
      Toast.show('Successfully updated profile')
      navigation.navigate('Main')
    } catch (e) {
      if (e.response && e.response.data && e.response.data.errors) {
        setErrors({ ...initialErrors, ...e.response.data.errors })
      } else {
        setErrors({ ...initialErrors, name: [e.response.data.message] })
      }
      Toast.show(e.response.data.message)
    }
    setLoading(false)
  }

  return (
    <Panel header="My Profile">
      <TextInput
        label='Name'
        onChangeText={val => updateForm({ name: val })}
        value={form.name}
        error={!!errors.name[0]}
        mode="outlined"
      />
      {errors.name[0] && <HelperText type="error">{errors.name[0]}</HelperText>}
      <TextInput
        label='Email'
        onChangeText={val => updateForm({ email: val })}
        value={form.email}
        error={!!errors.email[0]}
        autoCompleteType="email"
        mode="outlined"
      />
      {errors.email[0] && <HelperText type="error">{errors.email[0]}</HelperText>}
      <TextInput
        label='Password'
        onChangeText={val => updateForm({ password: val })}
        value={form.password}
        error={!!errors.password[0]}
        autoCompleteType='password'
        mode="outlined"
        secureTextEntry={true}
      />
      {errors.password[0] && <HelperText type="error">{errors.password[0]}</HelperText>}
      <TextInput
        label='Password confirmation'
        onChangeText={val => updateForm({ password_confirmation: val })}
        value={form.password_confirmation}
        error={!!errors.password_confirmation[0]}
        autoCompleteType='password'
        mode="outlined"
        secureTextEntry={true}
      />
      {errors.password_confirmation[0] && <HelperText type="error">{errors.password_confirmation[0]}</HelperText>}
      <View style={{ paddingTop: 20 }} />
      <Button mode="contained" icon="user" onPress={onSubmit} loading={loading}>Update</Button>
    </Panel>
  )
}
