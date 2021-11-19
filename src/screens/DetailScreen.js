import React, { useState, useEffect } from 'react'
import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  View,
} from 'react-native'
import { Button } from 'react-native-paper'
import MapView, { Circle, PROVIDER_GOOGLE } from 'react-native-maps'
import { ScrollView } from 'react-native-gesture-handler'
import firestore from '@react-native-firebase/firestore'
import auth from '@react-native-firebase/auth'

export default function DetailScreen({ route }) {
  const { obj } = route.params
  const [requesterID, setRequesterID] = useState()

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

  useEffect(() => {
    (async () => {
      let userId = auth().currentUser.uid
      setRequesterID(userId)
    })()
  }, [requesterID])

  const handleRequest = async () => {
    if (requesterID) {
      await firestore()
        .collection('Donations')
        .doc(id)
        .update({
          isClaimed: requesterID
        }).catch(error => console.error(error))
    }
  }

  return (
    <ScrollView >
      <Image style={styles.img} source={{ uri: imageURL }} />
      <View style={styles.ctnDetails}>
        <Text style={styles.title, styles.txt} >{title}</Text>
        <Text style={styles.txt}>Donated by: {donorName}</Text>
        <Text style={styles.txt}>Added: {calculateDate()}</Text>
        <Text style={styles.txt}>Quantity: {quantity}</Text>
        <Text style={styles.txt}>Description: {description}</Text>
        <Text style={styles.txt}>Pickup Time: {pickUpTime}</Text>
        <Text style={styles.txt}>Approximate Location</Text>
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
          <Circle
            center={{ latitude: latitude, longitude: longitude }}
            radius={300}
            strokeColor="#016FB9"
            strokeWidth={2}
            fillColor="rgba(1, 111, 185, 0.3)"
          />
        </MapView>
      </View>
      <Button
        mode="contained"
        color="#016FB9"
        style={styles.btnRequest}
        onPress={handleRequest}
      >
        Request this
      </Button>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  img: {
    height: 300,
    width: 400,
  },
  ctnDetails: {
    padding: 5,
  },
  title: {
    fontSize: 20,
    fontWeight: '800',
  },
  map: {
    width: Dimensions.get('window').width,
    height: 250,
    marginTop: 5,
  },
  txt: {
    marginTop: 5,
  },
  btnRequest: {
    width: 300,
    alignSelf: 'center',
    marginTop: 20,
    marginBottom: 20,
  },
})