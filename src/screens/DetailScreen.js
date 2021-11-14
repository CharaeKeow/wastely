import React, { useState, useEffect } from 'react'
import {
  Button,
  Image,
  StyleSheet,
  Text,
  View,
} from 'react-native'

export default function DetailScreen({ route }) {
  const { obj } = route.params

  const {
    title,
    quantity,
    description,
    image,
    donorName,
  } = obj
  console.log(obj)

  return (
    <View>
      <Image style={styles.img} source={require('../../assets/food-pics/food_banana.jpg')} />
      <Text>{title}</Text>
      <Text>{quantity}</Text>
      <Text>{description}</Text>
      <Text>{donorName}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  img: {
    height: 300,
    width: 400,
  }
})