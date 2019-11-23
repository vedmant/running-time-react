import React, { useEffect, useRef } from 'react'
import { TextField as TextFieldMaterial } from 'react-native-material-textfield'

export default React.forwardRef(({ value, ...props }, ref) => {
  const rref = useRef(null)

  const setReference = reference => {
    ref && ref(reference)
    rref.current = reference
  }

  useEffect(() => {
    rref.current.setValue(value)
  }, [value])

  return <TextFieldMaterial ref={setReference} {...props} />
})
