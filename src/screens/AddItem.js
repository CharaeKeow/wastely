import React, { useEffect, useState } from "react"
import {
  View,
  Text
} from 'react-native'
import auth from '@react-native-firebase/auth'
import { RadioButton, TextInput } from 'react-native-paper';

import ImagePickerComponent from "../components/ImagePicker"
import { SafeAreaInsetsContext } from "react-native-safe-area-context";
import LocationPicker from "../components/LocationPicker";
import { ScrollView } from "react-native-gesture-handler";

export default function AddItem() {
  const [value, setValue] = useState()
  const [title, setTitle] = useState()
  const [description, setDescription] = useState()
  const [quantity, setQuantity] = useState()
  const [pickUpTime, setPickUpTime] = useState()
  const [location, setLocation] = useState()
  const [duration, setDuration] = useState()

  useEffect(() => {
    const user = auth().currentUser
    console.log(user.uid)
  }, [])

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
    <ScrollView>
      <ImagePickerComponent />
      <TextInput
        label="Title"
        value={title}
        onChangeText={title => setTitle(title)}
      />
      <TextInput
        label="Description"
        value={description}
        onChangeText={description => setDescription(description)}
        multiline
      />
      <TextInput
        label="Quantity"
        value={quantity}
        onChangeText={quantity => setQuantity(quantity)}
      />
      <TextInput
        label="Pick up times"
        value={pickUpTime}
        onChangeText={pickUpTime => setPickUpTime(pickUpTime)}
      />
      <LocationPicker />
    </ScrollView>
  )
}