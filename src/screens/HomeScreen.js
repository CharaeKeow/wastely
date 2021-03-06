import React, { useState, useEffect } from 'react'
import {
  FlatList,
  View,
} from 'react-native'
import { FAB } from 'react-native-paper'
import firestore from '@react-native-firebase/firestore'
import { ActivityIndicator, Chip, Colors } from 'react-native-paper'
const haversine = require('haversine')

import * as HookState from '@hookstate/core'

import store from '../lib/store'
import styles from '../styles/HomeScreen.style'
import Item from '../components/Item'

export default function HomeScreen({ navigation }) {
  const [selected, setSelected] = useState('all')
  const [filter, setFilter] = useState();
  const [donations, setDonations] = useState([])
  const [loading, setLoading] = useState(true)

  //for getting user location
  //const [location, setLocation] = useState(null)
  //const [errorMsg, setErrorMsg] = useState(null)

  // Firestore 'Donations' document reference
  const ref = firestore().collection('Donations')

  const { location, errorMsg } = HookState.useState(store)

  //if error alert user that need their location
  if (errorMsg.promised) {
    alert(errorMsg)
  }

  useEffect(() => {
    let isMounted = true

    if (isMounted) {
      return ref.onSnapshot((querySnapshot) => {
        const list = []

        querySnapshot.forEach(doc => {
          //assign data from document
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

          let distance = calculateLocation(latitude, longitude)

          //push data to temp array list
          if (!isClaimed) {
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
              distance: distance,
            })
          }

          setDonations(list)

          if (loading) {
            setLoading(false)
          }
        })
      }, [])
    }
    return () => { isMounted = false }
  }, [])

  const renderItem = ({ item }) => {
    return <Item item={item} navigation={navigation} />
  }

  const calculateLocation = (itemLat, itemLong) => {

    const loc = location.get()

    const start = {
      latitude: loc.coords.latitude,
      longitude: loc.coords.longitude
    }
    const end = {
      latitude: itemLat,
      longitude: itemLong,
    }
    return haversine(start, end)
  }

  if (loading) {
    return (
      <ActivityIndicator animating={true} color={Colors.red800} />
    )
  }

  return (
    <View>
      <View style={styles.chipsContainer}>
        <Chip
          selected={selected == 'all' ? true : false}
          selectedColor={selected == 'all' ? '#016FB9' : '#000'}
          style={styles.chip}
          icon="filter"
          onPress={() => setSelected('all')
          }>All</Chip>
        <Chip
          selected={selected == 'food' ? true : false}
          selectedColor={selected == 'food' ? '#016FB9' : '#000'}
          style={styles.chip}
          icon="food"
          onPress={() => setSelected('food')
          }>Food</Chip>
        <Chip
          selected={selected == 'non-food' ? true : false}
          selectedColor={selected == 'non-food' ? '#016FB9' : '#000'}
          style={styles.chip}
          icon="heart"
          onPress={() => setSelected('non-food')
          }>Non-food</Chip>
      </View>
      <FlatList
        style={styles.flatListContainer}
        data={selected === 'all' ? donations : selected == 'food' ? donations.filter(donation => (donation.category == 'Food')) : donations.filter(donation => donation.category == 'Non-Food')}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
      <FAB
        style={styles.fab}
        big
        icon="plus"
        onPress={() => navigation.navigate('AddItem')}
      />
    </View>
  );
}
