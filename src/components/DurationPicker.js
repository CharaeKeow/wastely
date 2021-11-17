/* For picking the duration by showing a dropdown
 * duration state is passed as prop
 */

import React, { useState, useRef } from 'react'
import { Picker } from '@react-native-picker/picker'

export default function DurationPicker({ duration, setDuration }) {

  const handleValueChange = (itemValue, itemIndex) => {
    setDuration(itemValue)
  }

  return (
    <Picker
      setDuration={duration}
      onValueChange={handleValueChange}
    >
      <Picker.Item label="1 hours" value='1' />
      <Picker.Item label="2 hours" value='2' />
      <Picker.Item label="3 hours" value='3' />
      <Picker.Item label="4 hours" value='4' />
      <Picker.Item label="5 hours" value='5' />
      <Picker.Item label="6 hours" value='6' />
      <Picker.Item label="7 hours" value='7' />
      <Picker.Item label="8 hours" value='8' />
      <Picker.Item label="1 day" value='24' />
      <Picker.Item label="2 days" value='48' />
      <Picker.Item label="3 days" value='72' />
      <Picker.Item label="4 days" value='96' />
      <Picker.Item label="5 days" value='120' />
      <Picker.Item label="6 days" value='144' />
      <Picker.Item label="7 days" value='168' />
      <Picker.Item label="8 days" value='192' />
      <Picker.Item label="9 days" value='216' />
      <Picker.Item label="10 days" value='240' />
      <Picker.Item label="11 days" value='264' />
      <Picker.Item label="12 days" value='288' />
    </Picker>
  )
}