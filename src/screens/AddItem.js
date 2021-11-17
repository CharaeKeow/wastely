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
  const [location, setLocation] = useState()
  const [duration, setDuration] = useState() //in hours

  //dropdown picker
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(null);
  const [items, setItems] = useState([
    { label: "1 hours", value: '1' },
    { label: "2 hours", value: '2' },
    { label: "3 hours", value: '3' },
    { label: "4 hours", value: '4' },
    { label: "5 hours", value: '5' },
    { label: "6 hours", value: '6' },
    { label: "7 hours", value: '7' },
    { label: "8 hours", value: '8' },
    { label: "1 day", value: '24' },
    { label: "2 days", value: '48' },
    { label: "3 days", value: '72' },
    { label: "4 days", value: '96' },
    { label: "5 days", value: '120' },
    { label: "6 days", value: '144' },
    { label: "7 days", value: '168' },
    { label: "8 days", value: '192' },
    { label: "9 days", value: '216' },
    { label: "10 days", value: '240' },
    { label: "11 days", value: '264' },
    { label: "12 days", value: '288' },
    { label: "13 days", value: '312' },
    { label: "14 days", value: '336' },
    { label: "15 days", value: '360' },
    { label: "16 days", value: '384' },
    { label: "17 days", value: '408' },
    { label: "18 days", value: '432' },
    { label: "19 days", value: '456' },
    { label: "20 days", value: '480' },
    { label: "21 days", value: '504' },
    { label: "22 days", value: '528' },
    { label: "23 days", value: '552' },
    { label: "24 days", value: '576' },
    { label: "25 days", value: '600' },
    { label: "26 days", value: '624' },
    { label: "27 days", value: '648' },
    { label: "28 days", value: '672' },
    { label: "29 days", value: '696' },
    { label: "30 days", value: '720' },
  ]);

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
        <LocationPicker />
        <DropDownPicker
          open={open}
          value={selected}
          items={items}
          setOpen={setOpen}
          setValue={setSelected}
          setItems={setItems}
          listMode="MODAL"
          scrollViewProps={{
            decelerationRate: "fast"
          }}
          modalProps={{
            animationType: "fade"
          }}
          flatListProps={{
            initialNumToRender: 10
          }}
          modalTitle="Select Duration"
          modalContentContainerStyle={{

          }}
        />
      </ScrollView>
    </View>
  )
}

//TODO: <DurationPicker duration={duration} setDuration={setDuration} />