import React, { useState } from 'react'
import { View, Button } from 'react-native'
import TextField from '../../components/TextField'
import { storeEntry, loadEntries } from '../../actions/entries'
import Toast from 'react-native-root-toast'
import DateTimePicker from 'react-native-modal-datetime-picker'
import dayjs from 'dayjs'

const initialErrors = { date: [], distance: [], time: [] }
const initialValues = { date: dayjs().format('MM/DD/YYYY'), distance: '', time: '' }

export default EntryForm = ({ dispatch, onSuccess }) => {
  const [form, setForm] = useState(initialValues)
  const updateForm = data => setForm(Object.assign(form, data))
  const [errors, setErrors] = useState(initialErrors)
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false)
  const [isTimePickerVisible, setTimePickerVisibility] = useState(false)

  const onSubmit = async () => {
    try {
      await dispatch(storeEntry(form))
      setErrors(initialErrors)
      Toast.show('Successfully added new record')
      dispatch(loadEntries())
      if (onSuccess) onSuccess()
    } catch (e) {
      if (e.response && e.response.data && e.response.data.errors) {
        setErrors({ ...initialErrors, ...e.response.data.errors })
      } else {
        setErrors({ ...initialErrors, date: [e.response.data.message] })
      }
      Toast.show(e.response.data.message)
    }
  }

  return (
    <View>
      <TextField
        label='Date'
        onChangeText={val => updateForm({ date: val })}
        value={form.date}
        error={errors.date[0]}
        onFocus={() => setDatePickerVisibility(true)}
      />
      <TextField
        label='Distance'
        onChangeText={val => updateForm({ distance: val })}
        value={form.distance}
        error={errors.distance[0]}
        keyboardType='numeric'
      />
      <TextField
        label='Time'
        onChangeText={val => updateForm({ time: val })}
        value={form.time}
        error={errors.time[0]}
        onFocus={() => setTimePickerVisibility(true)}
      />
      <DateTimePicker
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={(date) => {
          console.log(dayjs(date).format('MM/DD/YYYY'))
          updateForm({ date: dayjs(date).format('MM/DD/YYYY') })
          setDatePickerVisibility(false)
        }}
        onCancel={() => setDatePickerVisibility(false)}
      />
      <DateTimePicker
        isVisible={isTimePickerVisible}
        mode="time"
        onConfirm={(date) => {
          console.log(date)
          updateForm({ time: dayjs(date).format('HH:mm:ss') })
          setTimePickerVisibility(false)
        }}
        onCancel={() => setTimePickerVisibility(false)}
      />
      <View style={{ paddingTop: 20 }} />
      <Button onPress={onSubmit} title="Submit" />
    </View>
  )
}
