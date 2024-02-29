import React, { cloneElement, useState } from 'react'
import { Text, TextInput, View } from 'react-native'

export default function ({ label, icon, error, className, ...props }) {
  const [focused, setFocused] = useState(false)
  const border = error ? 'border-red-600' : (focused ?  'border-indigo-600' : 'border-gray-300')

  return (
    <View className={`mb-4 ${className}`}>
      {label && (<Text className="mb-2">{label}</Text>)}
      <View className={`border px-2 flex flex-row items-center justify-start rounded-lg bg-white ${border}`}>
        {icon && cloneElement(icon, { weight: 'bold', size: 18, style: { marginRight: 5 } })}
        <TextInput className="w-full leading-none py-2.5" onFocus={() => setFocused(true)} onBlur={() => setFocused(false)} {...props} />
      </View>
      {error && <Text className="text-red-600 text-sm mt-1">{error}</Text>}
    </View>
  )
}
