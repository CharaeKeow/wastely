import React, { useEffect } from 'react'
import {
  Image,
  Text,
  StyleSheet,
  View,
} from 'react-native'
import firestore from '@react-native-firebase/firestore'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { NavigationContainer } from '@react-navigation/native'

export default function Item({ item, navigation }) {
  useEffect(() => {
    //console.log(data)
  })

  return (
    <TouchableOpacity
      style={styles.item}
      onPress={() => navigation.navigate('DetailScreen', { obj: item })}
    >
      <Text>{item.title}</Text>
      <Text>{item.quantity}</Text>
      <Text>{item.donorName}</Text>
      <Image style={styles.img} source={require('../../assets/food-pics/food_banana.jpg')} />
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  img: {
    height: 100,
    width: 100,
  },
  item: {
    marginTop: 10,
    marginBottom: 10,
    padding: 10,
    flex: 1,
    width: 300,
    alignSelf: 'center',
    backgroundColor: '#fff',
    borderRadius: 15,
  }

})