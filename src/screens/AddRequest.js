import React, { useEffect, useState } from "react"
import {
  View,
  Text
} from 'react-native'
import auth from '@react-native-firebase/auth'
import firestore from '@react-native-firebase/firestore'
import storage from '@react-native-firebase/storage'
import { Button, RadioButton, TextInput } from 'react-native-paper'

import ImagePickerComponent from "../components/ImagePicker"
import DurationPicker from '../components/DurationPicker'
import LocationPicker from "../components/LocationPicker"
import { ScrollView } from "react-native-gesture-handler"
import styles from '../styles/AddItem.style'
import { add } from "react-native-reanimated"

export default function AddRequest() {
  const [category, setCategory] = useState()
  const [title, setTitle] = useState()
  const [description, setDescription] = useState()
  const [address, setAddress] = useState()
  const [phoneNo, setPhoneNo] = useState()
  const [quantity, setQuantity] = useState()
  const [pickUpTime, setPickUpTime] = useState()
  const [latitude, setLatitude] = useState(null)
  const [longitude, setLongitude] = useState(null)
  const [duration, setDuration] = useState() //in hours -> pass hook to DurationPicker for value to be updated
  const [imageURL, setImageURL] = useState() //for storing the image URL in Firbase Storage

  //For getting uid and username for firestore
  const [uid, setUid] = useState()
  const [userName, setUserName] = useState()

  useEffect(async () => {
    let isMounted = true

    if (isMounted) {
      let userId = auth().currentUser.uid
      setUid(userId)

      await firestore()
        .collection('Users')
        .get()
        .then(querySnapshot => {
          querySnapshot.forEach(documentSnapshot => {
            if (documentSnapshot.id === uid) {
              setUserName(documentSnapshot.data().name)
            }
            console.log(documentSnapshot.data())
          })
        })
    }

    return () => { isMounted = false }
  }, [uid])

  if (!category) {
    return (
      <View>
        <RadioButton.Group onValueChange={newValue => setCategory(newValue)} value={category}>
          <RadioButton.Item label="Emergency" value="Emergency" />
          <RadioButton.Item label="Volunteer" value="Volunteer" />
          <RadioButton.Item label="Other" value="Other (food, clothes, etc.)" />
        </RadioButton.Group>
      </View>
    )
  }

  const handleSubmit = async () => {
    if (category && title && description && latitude && longitude && imageURL && phoneNo && address) {
      const item = {
        category: category,
        title: title,
        description: description,
        latitude: latitude,
        longitude: longitude,
        imageURL: imageURL,
        uid: uid,
        userName: userName,
        address: address,
        phoneNo: phoneNo,
        isHelped: false, //have been helped or not
        timeStamp: Date.now(), //current UTC date that this item is created
      }

      firestore()
        .collection('Requests')
        .add(item)
        .then(() => {
          console.log('Item added to Firestore!')
        }).catch(error => console.error(error))
    } else {
      alert('Please enter all information!')
    }
  }

  return (
    <View>
      <ScrollView>
        <ImagePickerComponent setImageURL={setImageURL} />
        <TextInput
          label="Title"
          value={title}
          onChangeText={title => setTitle(title)}
          style={styles.txtField}
        />
        <TextInput
          label="Description"
          value={description}
          onChangeText={description => setDescription(description)}
          multiline
          style={styles.txtField}
        />
        <TextInput
          label="Phone Number"
          value={phoneNo}
          onChangeText={phoneNo => setPhoneNo(phoneNo)}
          input
          style={styles.txtField}
        />
        <TextInput
          label="Address (avoid give full address for privacy reason)"
          value={address}
          onChangeText={address => setAddress(address)}
          multiline
          style={styles.txtField}
        />
        <Text>Note: Your coordinate is used for people to come for help in case they can't find your address</Text>
        <Text style={styles.lblText}>Your location</Text>
        <LocationPicker
          latitude={latitude}
          longitude={longitude}
          setLatitude={setLatitude}
          setLongitude={setLongitude}
        />
        <Button
          mode="contained"
          color="#016FB9"
          style={styles.btnSubmit}
          onPress={handleSubmit}
        >
          Submit
        </Button>
      </ScrollView>
    </View>
  )
}