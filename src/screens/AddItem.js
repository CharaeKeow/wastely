import React, { useEffect, useState } from "react"
import {
  View,
  Text
} from 'react-native'
import auth from '@react-native-firebase/auth'
import { RadioButton } from 'react-native-paper';

import ImagePickerComponent from "../components/ImagePicker"

export default function AddItem() {
  const [value, setValue] = useState()

  useEffect(() => {
    const user = auth().currentUser
    console.log(user.uid)
  })

  //TODO: Add an empty skeleton frame so that the added image is put there. To keep UI consistent
  //as the image will push other components downwards - 👎

  if (!value) {
    return (
      <View>
        <RadioButton.Group onValueChange={newValue => setValue(newValue)} value={value}>
          <RadioButton.Item label="Food" value="Food" />
          <RadioButton.Item label="Non-Food" value="Non-Food" />
        </RadioButton.Group>
      </View>
    )
  }

  return (
    <View>
      <ImagePickerComponent />
    </View>
  )
}