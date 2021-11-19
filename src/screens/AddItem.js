import React, { useEffect, useState } from "react"
import {
  View,
  Text
} from 'react-native'
import auth from '@react-native-firebase/auth'
import firestore from '@react-native-firebase/firestore'
import storage from '@react-native-firebase/storage'
import { Button, RadioButton, TextInput } from 'react-native-paper';

import ImagePickerComponent from "../components/ImagePicker"
import DurationPicker from '../components/DurationPicker'
import LocationPicker from "../components/LocationPicker"
import { ScrollView } from "react-native-gesture-handler"
import styles from '../styles/AddItem.style'

export default function AddItem() {
  const [category, setCategory] = useState()
  const [title, setTitle] = useState()
  const [description, setDescription] = useState()
  const [quantity, setQuantity] = useState()
  const [pickUpTime, setPickUpTime] = useState()
  const [latitude, setLatitude] = useState(null)
  const [longitude, setLongitude] = useState(null)
  const [duration, setDuration] = useState() //in hours -> pass hook to DurationPicker for value to be updated
  const [imageURL, setImageURL] = useState() //for storing the image URL in Firbase Storage

  //For getting uid and username for firestore
  const [uid, setUid] = useState()
  const [donorName, setDonorName] = useState()

  useEffect(async () => {
    let userId = auth().currentUser.uid
    setUid(userId)

    await firestore()
      .collection('Users')
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(documentSnapshot => {
          if (documentSnapshot.id === uid) {
            setDonorName(documentSnapshot.data().name)
          }
          console.log(documentSnapshot.data())
        })
      })
  }, [uid])

  //TODO: Add an empty skeleton frame so that the added image is put there. To keep UI consistent
  //as the image will push other components downwards - 👎

  //TODO: Store up to several images. So imageURL should store array

  if (!category) {
    return (
      <View>
        <RadioButton.Group onValueChange={newValue => setCategory(newValue)} value={category}>
          <RadioButton.Item label="Food" value="Food" />
          <RadioButton.Item label="Non-Food" value="Non-Food" />
        </RadioButton.Group>
      </View>
    )
  }

  //handle when submit button is clicked => send data to Firestore
  const handleSubmit = async () => {

    if (category && title && description && quantity && pickUpTime && latitude && longitude && duration && imageURL) {
      const item = {
        category: category,
        title: title,
        description: description,
        quantity: quantity,
        pickUpTime: pickUpTime,
        latitude: latitude,
        longitude: longitude,
        duration: duration,
        imageURL: imageURL,
        uid: uid,
        donorName: donorName,
        isClaimed: false,
        isPickedUp: false,
        timeStamp: Date.now(), //current UTC date that this item is created
      }

      //Add item to Firestore
      firestore()
        .collection('Donations')
        .add(item)
        .then(() => {
          console.log('Item added to Firestore!')
        }).catch(error => console.error(error))

    } else {
      alert(`Please make sure to enter all information!`)
    }
  }

  //TODO: Allow user to pick location on the map and add search function (for improving the accuracy)

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
          label="Quantity"
          value={quantity}
          onChangeText={quantity => setQuantity(quantity)}
          style={styles.txtField}
        />
        <TextInput
          label="Pick up times"
          value={pickUpTime}
          onChangeText={pickUpTime => setPickUpTime(pickUpTime)}
          style={styles.txtField}
        />
        <Text style={styles.lblText}>Your location</Text>
        <LocationPicker
          latitude={latitude}
          longitude={longitude}
          setLatitude={setLatitude}
          setLongitude={setLongitude}
        />
        <Text style={styles.lblText}>Pick duration</Text>
        <DurationPicker
          setDuration={setDuration}
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

//TODO: <DurationPicker duration={duration} setDuration={setDuration} />