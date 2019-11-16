import React, { useState, useEffect } from 'react'
import { View } from 'react-native'
import TextField from '../../components/TextField'
import { storeEntry, loadEntries, updateEntry } from '../../actions/entries'
import Toast from 'react-native-root-toast'
import DateTimePicker from 'react-native-modal-datetime-picker'
import dayjs from 'dayjs'
import Button from '../../components/Button'

const initialErrors = { date: [], distance: [], time: [] }
const initialValues = { date: dayjs().format('MM/DD/YYYY'), distance: '', time: '' }

export default EntryForm = ({ dispatch, onSuccess, item }) => {
  const [form, setForm] = useState({ ...initialValues })
  const [errors, setErrors] = useState(initialErrors)
  const [loading, setLoading] = useState(false)
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false)
  const [isTimePickerVisible, setTimePickerVisibility] = useState(false)

  const updateForm = data => setForm(Object.assign(form, data))

  useEffect(() => {
    if (item) {
      setForm({ date: dayjs(item.date).format('MM/DD/YYYY'), distance: item.distance, time: item.time })
    }
  }, [item])

  const onSubmit = async () => {
    setLoading(true)
    try {
      if (item) await dispatch(updateEntry({ id: item.id, form }))
      else await dispatch(storeEntry(form))
      setErrors(initialErrors)
      if (!item) setForm({ ...initialValues })
      Toast.show(`Successfully ${item ? 'updated' : 'added new'} record`)
      dispatch(loadEntries())
      if (onSuccess) onSuccess()
    } catch (e) {
      console.log(e)
      if (e.response && e.response.data && e.response.data.errors) {
        setErrors({ ...initialErrors, ...e.response.data.errors })
      } else {
        setErrors({ ...initialErrors, date: [e.response.data.message] })
      }
      Toast.show(e.response.data.message)
    }
    setLoading(false)
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
      <Button onPress={onSubmit} isLoading={loading}>
        Submit
      </Button>
    </View>
  )
}
