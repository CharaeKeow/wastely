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
      <FlatList
        style={styles.flatListContainer}
        data={requests}
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