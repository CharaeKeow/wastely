import React, { useEffect } from 'react'
import {
  Image,
  Text,
  StyleSheet,
  View,
} from 'react-native'
import firestore from '@react-native-firebase/firestore'
import { TouchableOpacity } from 'react-native-gesture-handler'

export default function Item({ item }) {
  useEffect(() => {
    //console.log(data)
  })

  return (
    <View style={styles.item}>
      <Text>{item.title}</Text>
      <Text>{item.quantity}</Text>
      <Text>{item.donorName}</Text>
      <Image style={styles.img} source={require('../../assets/food-pics/food_banana.jpg')} />
    </View>
  )
}

const styles = StyleSheet.create({
  img: {
    height: 100,
    width: 100,
  },
  item: {
    marginBottom: 15,
    flex: 1,
  }
})