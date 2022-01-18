import React, { useState, useEffect } from 'react'
import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  View,
} from 'react-native'
import { Button } from 'react-native-paper'
//TODO: Do I need MapView for this? As it is my own item, so maybe not
import { ScrollView } from 'react-native-gesture-handler'
import firestore from '@react-native-firebase/firestore'
import auth from '@react-native-firebase/auth'
import { ActivityIndicator, Colors } from 'react-native-paper'

import styles from '../styles/MyListingDetailScreen.style'

export default function MyListingDetailScreen({ route }) {
  const { obj } = route.params
  const [request, setRequest] = useState(0)

  const {
    id,
    category,
    description,
    donorName,
    duration,
    title,
    imageURL,
    isClaimed,
    isPickedUp,
    latitude,
    longitude,
    pickUpTime,
    quantity,
    timeStamp,
    uid,
  } = obj
  console.log(obj)

  const calculateDate = () => {
    let date = new Date(timeStamp)
    return date.toDateString()
  }

  useEffect(async () => {
    let isMounted = true

    if (isMounted) {
      if (isClaimed) {
        await firestore()
          .collection('Users')
          .get()
          .then(querySnapshot => {
            querySnapshot.forEach(doc => {
              if (doc.id === isClaimed) {
                console.log(doc.data())
                setRequest(doc.data())
              }
            })
          })
      }
    } else {
      setRequest(0)
    }

    return () => isMounted = false
  }, [])

  return (
    <ScrollView >
      <Image style={styles.img} source={{ uri: imageURL }} />
      <View style={styles.ctnDetails}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.txt}>Donated by: {donorName}</Text>
        <Text style={styles.txt}>Added: {calculateDate()}</Text>
        <Text style={styles.txt}>Quantity: {quantity}</Text>
        <Text style={styles.txt}>Description: {description}</Text>
        <Text style={styles.txt}>Pickup Time: {pickUpTime}</Text>
        {request != 0 ? <Text style={styles.txt}>Requested by: {request.name}</Text> : <Text style={styles.txt}>No Request</Text>}
      </View>
    </ScrollView>
  )
}