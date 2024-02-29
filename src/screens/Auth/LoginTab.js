import React, { useState } from 'react'
import { View } from 'react-native'
import Toast from 'react-native-root-toast'
import Panel from '@/components/Panel'
import { Lock, User } from 'phosphor-react-native'
import { useAuthStore } from '@/stores/auth'
import InputGroup from '@/components/InputGroup'
import Button from '@/components/Button'

const initialErrors = { email: [], password: [] }
const initialValues = { email: 'admin@gmail.com', password: '123456' }

export default function () {
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({ ...initialValues })
  const [errors, setErrors] = useState(initialErrors)

  const updateForm = data => setForm({ ...form, ...data })

  const onSubmit = async () => {
    setLoading(true)
    try {
      await useAuthStore.getState().login(form)
      Toast.show('Successfully logged in')
    } catch (e) {
      if (! e.response) {
        throw e
      }
      if (e.response && e.response.data && e.response.data.errors) {
        setErrors({ ...initialErrors, ...e.response.data.errors })
      } else {
        setErrors({ ...initialErrors, email: [e.response.data.message] })
      }
      Toast.show(e.response.data.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <View className="p-2">
      <Panel>
        <InputGroup
          label="Email"
          icon={<User />}
          onChangeText={v => updateForm({ email: v })}
          value={form.email}
          error={errors.email?.[0]}
          autoCompleteType="email"
        />
        <InputGroup
          label="Password"
          icon={<Lock />}
          onChangeText={v => updateForm({ password: v })}
          value={form.password}
          error={errors.password?.[0]}
          autoCompleteType="password"
          secureTextEntry={true}
        />
        <Button
          label="Login"
          icon={<User />}
          onPress={onSubmit}
          loading={loading}
          className="mt-4"
        />
      </Panel>
    </View>
  )
}
