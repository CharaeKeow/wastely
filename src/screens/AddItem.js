import React, { useEffect, useState } from "react"
import {
  Button,
  Platform,
  StyleSheet,
  Text,
  View,
} from 'react-native'
import auth from '@react-native-firebase/auth'

import ImagePickerComponent from "../components/ImagePicker"

export default function AddItem() {

  useEffect(() => {
    const user = auth().currentUser
    console.log(user.uid)
  })

  //TODO: Add an empty skeleton frame so that the added image is put there. To keep UI consistent
  //as the image will push other components downwards - 👎

  return (
    <View>
      <Text>Add Item</Text>
      <ImagePickerComponent />
    </View>
  )
}