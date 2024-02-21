import React, { useState } from 'react'
import { ScrollView, StyleSheet, View } from 'react-native'
import Toast from 'react-native-root-toast'
import Panel from '../../components/Panel'
import Colors from '../../constants/Colors'
import { TextInput, Button, HelperText } from 'react-native-paper'
import { User } from 'phosphor-react-native'
import { useAuthStore } from '@/stores/auth'

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
    <ScrollView style={styles.scene} enableOnAndroid>
      <Panel>
        <TextInput
          label="Name"
          onChangeText={val => updateForm({ name: val })}
          value={form.name}
          error={!!errors.name[0]}
          mode="outlined"
        />
        {errors.name[0] && (
          <HelperText type="error">{errors.name[0]}</HelperText>
        )}
        <TextInput
          label="Email"
          onChangeText={val => updateForm({ email: val })}
          value={form.email}
          error={!!errors.email[0]}
          autoCompleteType="email"
          mode="outlined"
          style={{marginTop: 20}}
        />
        {errors.email[0] && (
          <HelperText type="error">{errors.email[0]}</HelperText>
        )}
        <TextInput
          label="Password"
          onChangeText={val => updateForm({ password: val })}
          value={form.password}
          error={!!errors.password[0]}
          autoCompleteType="password"
          mode="outlined"
          secureTextEntry={true}
          style={{marginTop: 20}}
        />
        {errors.password[0] && (
          <HelperText type="error">{errors.password[0]}</HelperText>
        )}
        <TextInput
          label="Password confirmation"
          onChangeText={val => updateForm({ password_confirmation: val })}
          value={form.password_confirmation}
          error={!!errors.password_confirmation[0]}
          autoCompleteType="password"
          mode="outlined"
          secureTextEntry={true}
          style={{marginTop: 20}}
        />
        {errors.password_confirmation[0] && (
          <HelperText type="error">
            {errors.password_confirmation[0]}
          </HelperText>
        )}
        <View style={{ paddingTop: 20 }} />
        <Button
          mode="contained"
          icon={() => <User weight={'bold'} size={18} color={'white'} />}
          onPress={onSubmit}
          loading={loading}>
          Register
        </Button>
      </Panel>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  scene: {
    flex: 1,
    padding: 10,
    backgroundColor: Colors.pageBackground,
  },
})
