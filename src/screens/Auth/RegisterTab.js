import React, { useState } from 'react'
import { ScrollView } from 'react-native'
import Toast from 'react-native-root-toast'
import Panel from '@/components/Panel'
import { User } from 'phosphor-react-native'
import { useAuthStore } from '@/stores/auth'
import InputGroup from '@/components/InputGroup'
import Button from '@/components/Button'

const initialErrors = {
  name: [],
  email: [],
  password: [],
  password_confirmation: [],
}

const initialValues = {
  name: 'Test',
  email: 'user@gmail.com',
  password: '123456',
  password_confirmation: '123456',
}

export default function () {
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({ ...initialValues })
  const [errors, setErrors] = useState(initialErrors)

  const updateForm = data => setForm({ ...form, ...data })

  const onSubmit = async () => {
    setLoading(true)
    try {
      await useAuthStore.getState().register(form)
      Toast.show('Successfully registered')
    } catch (e) {
      if (! e.response) {
        throw e
      }

      if (e.response && e.response.data && e.response.data.errors) {
        setErrors({ ...initialErrors, ...e.response.data.errors })
      } else {
        setErrors({ ...initialErrors, name: [e.response.data.message] })
      }
      Toast.show(e.response.data.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <ScrollView className="p-2" enableOnAndroid>
      <Panel>
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
          mode="outlined"
          secureTextEntry={true}
        />
        <Button
          label="Register"
          icon={<User />}
          onPress={onSubmit}
          loading={loading}
          className="mt-4"
        />
      </Panel>
    </ScrollView>
  )
}
