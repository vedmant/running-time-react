import React, { useState } from 'react'
import { View, StyleSheet, Button, Text } from 'react-native'
import { Formik } from 'formik'
import { TextField } from 'react-native-material-textfield'
import { login } from '../../actions/auth'
import Toast from 'react-native-root-toast'
import DateTimePicker from 'react-native-modal-datetime-picker'
import dayjs from 'dayjs'

const initialErrors = { date: [], distance: [], hours: [], minutes: [], seconds: [] }
const initialValues = { date: dayjs().format('MM/DD/YYYY'), distance: '', hours: '', minutes: '', seconds: '' }

export default LoginTab = ({ dispatch, navigation, loading }) => {
  const [errors, setErrors] = useState(initialErrors)
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false)

  const onSubmit = async values => {
    try {
      await dispatch(login(values))
      Toast.show('Successfully added new record')
    } catch (e) {
      if (e.response && e.response.data && e.response.data.errors) {
        setErrors({ ...initialErrors, ...e.response.data.errors })
      } else {
        setErrors({ ...initialErrors, email: [e.response.data.message] })
      }
      Toast.show(e.response.data.message)
    }
  }

  return (
    <View>
      <Formik initialValues={initialValues} onSubmit={onSubmit}>
        {({ handleChange, handleBlur, handleSubmit, values, setFieldValue }) => (
          <View>
            <View style={{ flex: 1, flexDirection: 'row' }}>
              <View style={{ flex: 1 }}>
                <TextField
                  label='Date'
                  onChangeText={handleChange('date')}
                  onBlur={handleBlur('date')}
                  name='date'
                  value={values.date}
                  error={errors.date[0]}
                  onFocus={() => setDatePickerVisibility(true)}
                />
              </View>
              <View style={{ flex: 1 }}>
                <TextField
                  label='Distance'
                  onChangeText={handleChange('distance')}
                  onBlur={handleBlur('distance')}
                  value={values.distance}
                  error={errors.distance[0]}
                  keyboardType='numeric'
                />
              </View>
            </View>
            <View style={{ flex: 1, flexDirection: 'row' }}>
              <View style={{ flex: 1 }}>
                <TextField
                  label='Hours'
                  onChangeText={handleChange('hours')}
                  onBlur={handleBlur('hours')}
                  value={values.hours}
                  error={errors.hours[0]}
                  keyboardType='numeric'
                  maxLength={2}
                />
              </View>
              <View style={{ flex: 1 }}>
                <TextField
                  label='Minutes'
                  onChangeText={handleChange('minutes')}
                  onBlur={handleBlur('minutes')}
                  value={values.minutes}
                  error={errors.minutes[0]}
                  style={{ flex: 1 }}
                  keyboardType='numeric'
                  maxLength={2}
                />
              </View>
              <View style={{ flex: 1 }}>
                <TextField
                  label='Seconds'
                  onChangeText={handleChange('seconds')}
                  onBlur={handleBlur('seconds')}
                  value={values.seconds}
                  error={errors.seconds[0]}
                  style={{ flex: 1 }}
                  keyboardType='numeric'
                  maxLength={2}
                />
              </View>
            </View>
            <DateTimePicker
              isVisible={isDatePickerVisible}
              mode="date"
              onConfirm={(date) => {
                setFieldValue('date', dayjs(date).format('MM/DD/YYYY'))
                setDatePickerVisibility(false)
              }}
              onCancel={() => setDatePickerVisibility(false)}
            />
            <View style={{ paddingTop: 20 }} />
            <Button onPress={handleSubmit} title="Submit" />
          </View>
        )}
      </Formik>
    </View>
  )
}
