import React, { useState, useEffect } from 'react'
import { View } from 'react-native'
import Toast from 'react-native-root-toast'
import DateTimePicker from 'react-native-modal-datetime-picker'
import dayjs from 'dayjs'
import { TextInput, Button, HelperText } from 'react-native-paper'
import { useEntriesStore } from '@/stores/entries'

const initialErrors = { date: [], distance: [], time: [] }
const initialValues = {
  date: dayjs().format('MM/DD/YYYY'),
  distance: '',
  time: '',
}

export default function ({ onSuccess, item }) {
  const [form, setForm] = useState({ ...initialValues })
  const [errors, setErrors] = useState(initialErrors)
  const [loading, setLoading] = useState(false)
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false)
  const [isTimePickerVisible, setTimePickerVisibility] = useState(false)

  const updateForm = data => setForm({ ...form, ...data })

  useEffect(() => {
    if (item) {
      setForm({
        date: dayjs(item.date).format('MM/DD/YYYY'),
        distance: item.distance,
        time: item.time.split(':').map(s => s.padStart(2, '0')).join(':'),
      })
    }
  }, [item])

  const onSubmit = async () => {
    setLoading(true)
    try {
      if (item) {
        await useEntriesStore.getState().updateEntry({ id: item.id, form })
      } else {
        await useEntriesStore.getState().storeEntry(form)
      }
      setErrors(initialErrors)
      if (!item) {
        setForm({ ...initialValues })
      }
      Toast.show(`Successfully ${item ? 'updated' : 'added new'} record`)
      useEntriesStore.getState().loadEntries()
      if (onSuccess) {
        onSuccess()
      }
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
      <TextInput
        label="Date"
        onChangeText={val => updateForm({ date: val })}
        value={form.date}
        error={!!errors.date[0]}
        mode="outlined"
        onFocus={() => setDatePickerVisibility(true)}
      />
      {errors.date[0] && <HelperText type="error">{errors.date[0]}</HelperText>}
      <TextInput
        label="Distance"
        onChangeText={val => updateForm({ distance: val })}
        value={form.distance + ''}
        error={!!errors.distance[0]}
        mode="outlined"
        keyboardType="number-pad"
      />
      {errors.distance[0] && (
        <HelperText type="error">{errors.distance[0]}</HelperText>
      )}
      <TextInput
        label="Time"
        onChangeText={val => updateForm({ time: val })}
        value={form.time}
        error={!!errors.time[0]}
        mode="outlined"
        onFocus={() => setTimePickerVisibility(true)}
      />
      {errors.time[0] && <HelperText type="error">{errors.time[0]}</HelperText>}
      <DateTimePicker
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={date => {
          console.log(dayjs(date).format('MM/DD/YYYY'))
          updateForm({ date: dayjs(date).format('MM/DD/YYYY') })
          setDatePickerVisibility(false)
        }}
        onCancel={() => setDatePickerVisibility(false)}
      />
      <DateTimePicker
        isVisible={isTimePickerVisible}
        mode="time"
        onConfirm={date => {
          console.log(date)
          updateForm({ time: dayjs(date).format('HH:mm:ss') })
          setTimePickerVisibility(false)
        }}
        onCancel={() => setTimePickerVisibility(false)}
      />
      <View style={{ paddingTop: 20 }} />
      <Button mode="contained" onPress={onSubmit} loading={loading}>
        Submit
      </Button>
    </View>
  )
}
