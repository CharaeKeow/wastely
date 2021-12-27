import React, { useEffect } from 'react'
import {
  Image,
  Text,
  StyleSheet,
  View,
} from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'

export default function Request({ item, navigation }) {
  return (
    <TouchableOpacity
      style={styles.item}
      onPress={() => navigation.navigate('DetailScreen', { obj: item })}
    >
      <View>
        <Image style={styles.img} source={{ uri: item.imageURL }} />
      </View>
      <View style={styles.ctnDetails}>
        <Text style={item.category === 'Food' ? styles.categoryFood : item.category === 'Non-Food' ? styles.categoryNonFood : styles.categoryHelp}>{item.category}</Text>
        <Text style={styles.title}>{item.title}</Text>
        <Text>{item.donorName}</Text>
        <Text>📍 {item.distance.toFixed(2)} km</Text>
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
  },
  categoryFood: {
    borderRadius: 5,
    textAlign: 'center',
    color: '#fff',
    fontWeight: 'bold',
    backgroundColor: '#003FFF',
    padding: 2,
    width: 50,
  },
  categoryNonFood: {
    borderRadius: 5,
    textAlign: 'center',
    color: '#fff',
    fontWeight: 'bold',
    backgroundColor: '#00860B',
    padding: 2,
    width: 80,
  },
  categoryHelp: {
    borderRadius: 5,
    textAlign: 'center',
    color: '#fff',
    fontWeight: 'bold',
    backgroundColor: '#FF000F',
    padding: 2,
    width: 50,
  }
})