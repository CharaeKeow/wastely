import React, { useRef, useState, useEffect } from 'react'
import {
  View
} from 'react-native'
import MapView from 'react-native-map-clustering'
import { Marker, PROVIDER_GOOGLE } from 'react-native-maps'
import * as HookState from '@hookstate/core'
import firestore from '@react-native-firebase/firestore'
import { Chip } from 'react-native-paper'

import store from '../lib/store'
import styles from '../styles/ExploreScreen.style'

export default function ExploreScreen() {
  const [donations, setDonations] = useState([])
  const [requests, setRequests] = useState([])
  const [loading, setLoading] = useState(true)
  const [selected, setSelected] = useState('donation')
  const { location, errorMsg } = HookState.useState(store)
  const map = useRef(null)

  const ref = firestore().collection('Donations')
  const requestRef = firestore().collection('Requests')

  useEffect(() => {

    if (loading) {
      const subscriber = ref.onSnapshot((querySnapshot) => {
        const list = []

        querySnapshot.forEach(doc => {
          //assign data from document
          const {
            latitude,
            longitude,
          } = doc.data()

          list.push({
            id: doc.id,
            latitude,
            longitude,
          })

          setDonations(list)
        })
      })

      if (loading) {
        setLoading(false)
      }
      return () => subscriber()
    }

  }, [donations])

  const loadRequest = () => {

    const subscriber = requestRef.onSnapshot((querySnapshot) => {
      const list = []

      querySnapshot.forEach(doc => {
        //assign data from document
        const {
          latitude,
          longitude,
        } = doc.data()

        list.push({
          id: doc.id,
          latitude,
          longitude,
        })
        setRequests(list)
      })
    })
    console.log(requests)
    return () => subscriber()
  }

  return (
    <View>
      <View style={styles.chipsContainer}>
        <Chip
          selected={selected == 'donation' ? true : false}
          selectedColor={selected == 'donation' ? '#016FB9' : '#000'}
          style={styles.chip}
          icon="filter"
          onPress={() => setSelected('donation')
          }>Donation</Chip>
        <Chip
          selected={selected == 'request' ? true : false}
          selectedColor={selected == 'request' ? '#016FB9' : '#000'}
          style={styles.chip}
          icon="filter"
          onPress={() => {
            setSelected('request')
            loadRequest()
          }}>Request</Chip>
      </View>
      <MapView
        ref={map}
        loadingEnabled={true}
        loadingIndicatorColor="#666666"
        loadingBackgroundColor="#eeeeee"
        moveOnMarkerPress={false}
        //showsUserLocation={true}
        showsCompass={true}
        showsPointsOfInterest={false}
        zoomControlEnabled={true}
        initialRegion={{
          latitude: location.get().coords.latitude,
          longitude: location.get().coords.longitude,
          latitudeDelta: 0.05,
          longitudeDelta: 0.05,
        }}
        loadingEnabled={true}
        style={styles.map}
      >
        {!loading && selected == 'donation' ? donations.map((donation) => (
          <Marker
            key={donation.id}
            coordinate={{
              latitude: donation.latitude,
              longitude: donation.longitude
            }}
          />
        )) : requests.map((request) => (
          <Marker
            key={request.id}
            coordinate={{
              latitude: request.latitude,
              longitude: request.longitude
            }}
          />
        ))}
      </MapView>
    </View>
  );
}