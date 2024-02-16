import React, { useState } from 'react'
import { StyleSheet, View } from 'react-native'
import Toast from 'react-native-root-toast'
import Panel from '../../components/Panel'
import { TextInput, Button, HelperText } from 'react-native-paper'
import { User } from 'phosphor-react-native'
import { useAuthStore } from '@/stores/auth'

const initialErrors = { email: [], password: [] }
const initialValues = { email: 'user@gmail.com', password: '123456' }

export default function ({ navigation }) {
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({ ...initialValues })
  const [errors, setErrors] = useState(initialErrors)

  const updateForm = data => setForm({ ...form, ...data })

  const onSubmit = async () => {
    setLoading(true)
    try {
      await useAuthStore.getState().login(form)
      Toast.show('Successfully logged in')
      navigation.navigate('Main')
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
      setLoading(false)
    }
  }

  return (
    <View style={styles.scene}>
      <Panel>
        <TextInput
          label="Email"
          onChangeText={val => updateForm({ email: val })}
          value={form.email}
          error={!!errors.email[0]}
          autoCompleteType="email"
          mode="outlined"
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
          secureTextEntry={true}
          mode="outlined"
          style={{marginTop: 20}}
        />
        {errors.password[0] && (
          <HelperText type="error">{errors.password[0]}</HelperText>
        )}
        <View style={{ paddingTop: 20 }} />
        <Button
          mode="contained"
          icon={() => <User weight={'bold'} size={18} color={'white'} />}
          onPress={onSubmit}
          loading={loading}>
          Login
        </Button>
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
