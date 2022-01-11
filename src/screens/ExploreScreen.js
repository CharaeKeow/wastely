import React, { useRef, useState, useEffect } from 'react'
import {
  Text,
  StyleSheet,
  Dimensions,
  View
} from 'react-native'
import MapView from 'react-native-map-clustering'
import { Marker, PROVIDER_GOOGLE } from 'react-native-maps'
import * as HookState from '@hookstate/core'
import firestore from '@react-native-firebase/firestore'

import store from '../lib/store'

export default function ExploreScreen() {
  const [donations, setDonations] = useState([])
  const [loading, setLoading] = useState(true)
  const { location, errorMsg } = HookState.useState(store)
  const map = useRef(null)

  const ref = firestore().collection('Donations')

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

  return (
    <View>
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
        {!loading && donations.map((donation) => (
          <Marker
            key={donation.id}
            coordinate={{
              latitude: donation.latitude,
              longitude: donation.longitude
            }}
          />
        ))}
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: 150,
    width: 400,
  },
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height - 120,
  }
})