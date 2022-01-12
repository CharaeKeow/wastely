import React, { useState, useEffect } from 'react'
import {
  Image,
  FlatList,
  StyleSheet,
  Text,
  View,
  Dimensions,
} from 'react-native'
import { FAB } from 'react-native-paper'
import firestore from '@react-native-firebase/firestore'
import { ActivityIndicator, Chip, Colors } from 'react-native-paper'
const haversine = require('haversine')
import * as HookState from '@hookstate/core'

import store from '../lib/store'
import Request from '../components/Request'
import styles from '../styles/RequestScreen.style'

export default function RequestScreen({ navigation }) {
  const { location, errorMsg } = HookState.useState(store)
  const [requests, setRequests] = useState(null)
  const [loading, setLoading] = useState(null)
  const [selected, setSelected] = useState('all')

  const ref = firestore().collection('Requests')

  useEffect(() => {
    let isMounted = true

    if (isMounted) {
      return ref.onSnapshot((querySnapshot) => {
        const list = []

        querySnapshot.forEach(doc => {
          const {
            address,
            category,
            description,
            imageURL,
            isHelped,
            latitude,
            longitude,
            phoneNo,
            timeStamp,
            title,
            uid,
            userName,
          } = doc.data()

          let distance = calculateLocation(latitude, longitude)

          if (!isHelped) {
            list.push({
              id: doc.id,
              distance: distance,
              address,
              category,
              description,
              imageURL,
              isHelped,
              latitude,
              longitude,
              phoneNo,
              timeStamp,
              title,
              uid,
              userName,
            })
          }

          setRequests(list)
        })
      }, [])
    }

    return () => { isMounted = false }
  }, [])

  const renderItem = ({ item }) => {
    return <Request item={item} navigation={navigation} />
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
          selected={selected == 'emergency' ? true : false}
          selectedColor={selected == 'emergency' ? '#016FB9' : '#000'}
          style={styles.chip}
          icon="alert"
          onPress={() => setSelected('emergency')
          }>Emergency</Chip>
        <Chip
          selected={selected == 'volunteer' ? true : false}
          selectedColor={selected == 'volunteer' ? '#016FB9' : '#000'}
          style={styles.chip}
          icon="handshake"
          onPress={() => setSelected('volunteer')
          }>Volunteer</Chip>
        <Chip
          selected={selected == 'other' ? true : false}
          selectedColor={selected == 'other' ? '#016FB9' : '#000'}
          style={styles.chip}
          icon="food"
          onPress={() => setSelected('other')
          }>Other</Chip>
      </View>
      <FlatList
        style={styles.flatListContainer}
        data={selected === 'all' ? requests : selected == 'emergency' ? requests.filter(request => request.category == 'Emergency') : selected == 'volunteer' ? requests.filter(request => request.category == 'Volunteer') : requests.filter(request => request.category != 'Volunteer' && request.category != 'Emergency')}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
      <FAB
        style={styles.fab}
        big
        icon="plus"
        onPress={() => navigation.navigate('AddRequest')}
      />
    </View>
  )
}