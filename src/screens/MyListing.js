import React, { useState, useEffect } from 'react'
import {
  Button,
  FlatList,
  Image,
  StyleSheet,
  Text,
  View,
} from 'react-native'
import auth from '@react-native-firebase/auth'
import firestore from '@react-native-firebase/firestore'
import { ActivityIndicator, Colors } from 'react-native-paper'

import styles from '../styles/HomeScreen.style'
import Listing from '../components/Listing'

//TODO: Show only listing that belong to my id
//1. Grab my ID
//2. Query donations on Firestore, get the snapshot
//3. Filter only the donations with my id
//4. Show status - claimed, unclaimed, requested

export default function MyListing({ navigation }) {
  const [loading, setLoading] = useState(true)
  //userID
  const [userID, setUserID] = useState()
  //donations array to hold donations from Firestore
  const [donations, setDonations] = useState([])

  //Firestore ref
  const ref = firestore().collection('Donations')

  //Get user ID on load
  useEffect(async () => {
    let userID = auth().currentUser.uid
    setUserID(userID)
    setLoading(false)
  }, [])

  //Load items from Firestore
  useEffect(() => {
    let isMounted = true

    if (isMounted) {
      return ref.onSnapshot((querySnapshot) => {
        const list = []

        querySnapshot.forEach(doc => {
          const {
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
          } = doc.data()

          //Push only data with the same uid as userID
          if (uid === userID) {
            list.push({
              id: doc.id,
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
              distance: 0,
            })
          }
        })
        setDonations(list)
      }, [])
    }

    return () => { isMounted = false }
  }, [donations])

  const renderItem = ({ item }) => {
    return <Listing item={item} navigation={navigation} />
  }

  if (loading) {
    return (
      <ActivityIndicator animating={true} color={Colors.red800} />
    )
  }

  return (
    <View>
      <Text>{userID}</Text>
      <FlatList
        style={styles.flatListContainer}
        data={donations}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
    </View>
  )
}