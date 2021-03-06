import React, { useState, useEffect } from 'react'
import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  View,
} from 'react-native'
import { Button } from 'react-native-paper'
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps'
import { ScrollView } from 'react-native-gesture-handler'
import * as Linking from 'expo-linking'

import styles from '../styles/MyListingDetailScreen.style'

export default function RequestDetailScreen({ route }) {
  const { obj } = route.params
  const [requesterID, setRequesterID] = useState()

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
  } = obj

  const calculateDate = () => {
    let date = new Date(timeStamp)
    return date.toDateString()
  }

  return (
    <ScrollView>
      <Image style={styles.img} source={{ uri: imageURL }} />
      <View style={styles.ctnDetails}>
        <Text style={styles.title} >{title}</Text>
        <Text style={styles.txt}>Requested by: {userName}</Text>
        <Text style={styles.txt}>Added: {calculateDate()}</Text>
        <Text style={styles.txt}>Description: {description}</Text>
        <Text style={styles.txt}>Phone Number: {phoneNo}</Text>
        <Text style={styles.txt}>Address: {address}</Text>
        <Text style={styles.txt}>Coordinate: {latitude}, {longitude}</Text>
        <Text style={styles.txt}>Location: </Text>
        <MapView
          provider={PROVIDER_GOOGLE}
          map
          style={styles.map}
          zoomEnabled={true}
          initialRegion={{
            latitude: latitude,
            longitude: longitude,
            latitudeDelta: 0.0200,
            longitudeDelta: 0.0200,
          }}
        >
          <Marker
            coordinate={{ latitude: latitude, longitude: longitude }}
          />
        </MapView>
        <View>
          <Text style={styles.helpText}>Lend a Hend ♥:</Text>
          <View style={styles.btnHelpCtn}>
            <Button
              icon="whatsapp"
              mode="contained"
              style={styles.btnHelp}
              onPress={() => Linking.openURL(`https://wasap.my/+6${phoneNo}`)}>
              WhatsApp
            </Button>
            <Button
              icon="phone"
              mode="contained"
              style={styles.btnHelp}
              onPress={() => Linking.openURL(`tel:+6${obj.phoneNo}`)}>
              Call
            </Button>
          </View>
        </View>
      </View>
    </ScrollView>
  )
}