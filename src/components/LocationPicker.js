import React, { useState, useEffect } from 'react'
import {
  Dimensions,
  Text,
  View,
  StyleSheet
} from 'react-native'
import * as Location from 'expo-location'
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps'

export default function LocationPicker() {
  const [location, setLocation] = useState(null)
  const [latitude, setLatitude] = useState(null)
  const [longitude, setLongitude] = useState(null)
  const [errorMsg, setErrorMsg] = useState(null)
  const [region, setRegion] = useState(null)

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync()
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied')
        return
      }

      let location = await Location.getCurrentPositionAsync({})
      setLocation(location)
      setLatitude(location.coords.latitude)
      setLongitude(location.coords.longitude)
    })()
  }, [])

  let text = 'Waiting...'

  if (errorMsg) {
    text = errorMsg
  } else if (location) {
    //text = JSON.stringify(location)
    //console.log(`${latitude} ${longitude}`)
  }

  if (!longitude && !latitude) {
    return (
      <View></View>
    )
  }

  if (!longitude) {
    return (
      <View></View>
    )
  }

  if (!longitude) {
    return (
      <View></View>
    )
  }

  return (
    <View style={styles.container}>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        initialRegion={{
          latitude: latitude,
          longitude: longitude,
          latitudeDelta: 0.0200,
          longitudeDelta: 0.0200,
        }}
      >
        <Marker coordinate={{ latitude: latitude, longitude: longitude }} />
      </MapView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: 150,
    width: 400,
  },
  map: {
    width: Dimensions.get('window').width,
    height: 150,
  }
})