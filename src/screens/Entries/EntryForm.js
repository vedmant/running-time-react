import React, { useState } from 'react'
import { View } from 'react-native'
import Toast from 'react-native-root-toast'
import DateTimePicker from 'react-native-modal-datetime-picker'
import dayjs from 'dayjs'
import { useEntriesStore } from '@/stores/entries'
import InputGroup from '@/components/InputGroup'
import Button from '@/components/Button'

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
  const [booted, setBooted] = useState(false)

  const updateForm = data => setForm({ ...form, ...data })

  if (item && !booted) {
    setForm({
      date: dayjs(item.date).format('MM/DD/YYYY'),
      distance: item.distance,
      time: item.time.split(':').map(s => s.padStart(2, '0')).join(':'),
    })
    setBooted(true)
  }

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
      <InputGroup
        label="Date"
        onChangeText={val => updateForm({ date: val })}
        value={form.date}
        error={errors.date?.[0]}
        mode="outlined"
        onFocus={() => setDatePickerVisibility(true)}
      />
      <InputGroup
        label="Distance"
        onChangeText={val => updateForm({ distance: val })}
        value={form.distance + ''}
        error={errors.distance?.[0]}
        mode="outlined"
        keyboardType="number-pad"
      />
      <InputGroup
        label="Time"
        onChangeText={val => updateForm({ time: val })}
        value={form.time}
        error={errors.time?.[0]}
        mode="outlined"
        onFocus={() => setTimePickerVisibility(true)}
      />
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
      <Button label="Submit" mode="contained" onPress={onSubmit} loading={loading} />
    </View>
  )
}
