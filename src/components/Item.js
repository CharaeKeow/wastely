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
      <View>
        <Image style={styles.img} source={{ uri: item.imageURL }} />
      </View>
      <View style={styles.ctnDetails}>
        <Text style={styles.title}>{item.title}</Text>
        <Text>{item.donorName}</Text>
        <Text>{item.distance.toFixed(2)} km</Text>
      </View>
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
    flexDirection: 'row',
    width: 300,
    alignSelf: 'center',
    backgroundColor: '#fff',
    borderRadius: 15,
  },
  title: {
    fontSize: 20,
    fontWeight: '800',
  },
  ctnDetails: {
    padding: 5,
  }
})