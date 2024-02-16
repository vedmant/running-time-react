import React, { useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import Toast from 'react-native-root-toast'
import { register } from '../../actions/auth'
import Panel from '../../components/Panel'
import Colors from '../../constants/Colors'
import { TextInput, Button, HelperText } from 'react-native-paper'
import { User } from 'phosphor-react-native'

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

export default function ({ dispatch, navigation }) {
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({ ...initialValues })
  const [errors, setErrors] = useState(initialErrors)

  const updateForm = data => setForm({ ...form, ...data })

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
