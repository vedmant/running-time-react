import React, { useState } from 'react'
import Toast from 'react-native-root-toast'
import Panel from '@/components/Panel'
import { User } from 'phosphor-react-native'
import { useAuthStore } from '@/stores/auth'
import { useNavigation } from '@react-navigation/native'
import InputGroup from '@/components/InputGroup'
import Button from '@/components/Button'

const initialErrors = {
  name: [],
  email: [],
  password: [],
  password_confirmation: [],
}

export default function () {
  const navigation = useNavigation()
  const me = useAuthStore.getState().me

  const initialValues = {
    name: me.name,
    email: me.email,
    password: '',
    password_confirmation: '',
  }

  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({ ...initialValues })
  const [errors, setErrors] = useState(initialErrors)

  const updateForm = data => setForm(Object.assign(form, data))

  const onSubmit = async () => {
    setLoading(true)
    try {
      await useAuthStore.getState().updateProfile({ id: me.id, form })
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
      <InputGroup
        label="Name"
        onChangeText={val => updateForm({ name: val })}
        value={form.name}
        error={errors.name?.[0]}
      />
      <InputGroup
        label="Email"
        onChangeText={val => updateForm({ email: val })}
        value={form.email}
        error={errors.email?.[0]}
        autoCompleteType="email"
      />
      <InputGroup
        label="Password"
        onChangeText={val => updateForm({ password: val })}
        value={form.password}
        error={errors.password?.[0]}
        autoCompleteType="password"
        secureTextEntry={true}
      />
      <InputGroup
        label="Password confirmation"
        onChangeText={val => updateForm({ password_confirmation: val })}
        value={form.password_confirmation}
        error={errors.password_confirmation?.[0]}
        autoCompleteType="password"
        secureTextEntry={true}
      />
      <Button
        label="Update"
        icon={<User weight={'bold'} size={18} color={'white'} />}
        onPress={onSubmit} loading={loading}>
      </Button>
    </Panel>
  )
}
