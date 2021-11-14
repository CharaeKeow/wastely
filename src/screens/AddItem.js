import React, { useEffect, useState } from "react"
import {
  View,
} from 'react-native'
import auth from '@react-native-firebase/auth'

import ImagePickerComponent from "../components/ImagePicker"

export default function AddItem() {
  const [type, setType] = useState()

  useEffect(() => {
    const user = auth().currentUser
    console.log(user.uid)
  })

  //TODO: Add an empty skeleton frame so that the added image is put there. To keep UI consistent
  //as the image will push other components downwards - 👎

  if (!type) {
    return (
      <View>

      </View>
    )
  }

  return (
    <View>
      <ImagePickerComponent />
    </View>
  )
}