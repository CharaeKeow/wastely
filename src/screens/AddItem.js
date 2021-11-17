import React, { useEffect, useState } from "react"
import {
  View,
  Text
} from 'react-native'
import auth from '@react-native-firebase/auth'
import { RadioButton, TextInput } from 'react-native-paper';

import ImagePickerComponent from "../components/ImagePicker"
import DurationPicker from '../components/DurationPicker'
import { SafeAreaInsetsContext } from "react-native-safe-area-context";
import LocationPicker from "../components/LocationPicker"
import { ScrollView } from "react-native-gesture-handler"
import DropDownPicker from "react-native-dropdown-picker"

export default function AddItem() {
  const [value, setValue] = useState()
  const [title, setTitle] = useState()
  const [description, setDescription] = useState()
  const [quantity, setQuantity] = useState()
  const [pickUpTime, setPickUpTime] = useState()
  const [latitude, setLatitude] = useState(null)
  const [longitude, setLongitude] = useState(null)
  const [duration, setDuration] = useState() //in hours -> pass hook to DurationPicker for value to be updated

  //dropdown picker

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

  //TODO: Allow user to pick location on the map and add search function (for improving the accuracy)

  return (
    <View>
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
        <Text>Your location</Text>
        <Text>{latitude} {longitude}</Text>
        <LocationPicker
          latitude={latitude}
          longitude={longitude}
          setLatitude={setLatitude}
          setLongitude={setLongitude}
        />
        <Text>Pick duration</Text>
        <DurationPicker
          setDuration={setDuration}
        />
      </ScrollView>
    </View>
  )
}

//TODO: <DurationPicker duration={duration} setDuration={setDuration} />