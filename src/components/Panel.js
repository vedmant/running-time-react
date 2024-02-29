import React from 'react'
import { Text, View } from 'react-native'

export default function ({ header, children, className }) {
  return (
    <View className={`border-gray-300 border rounded-lg bg-white ${className}`}>
      {header && (
        <View className="p-3">
          <Text>{header}</Text>
        </View>
      )}
      <View className="p-3">{children}</View>
    </View>
  )
}

