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
      onPress={() => navigation.navigate('RequestDetailScreen', { obj: item })}
    >
      <View>
        <Image style={styles.img} source={{ uri: item.imageURL }} />
      </View>
      <View style={styles.ctnDetails}>
        <Text style={item.category === 'Emergency' ? styles.categoryEmergency : item.category === 'Volunteer' ? styles.categoryVolunteer : styles.categoryOther}>{item.category}</Text>
        <Text style={styles.title}>{item.title}</Text>
        <Text>👤 {item.userName}</Text>
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
    width: 350,
    alignSelf: 'center',
    backgroundColor: '#fff',
    borderRadius: 15,
  },
  title: {
    fontSize: 18,
    maxWidth: 230,
    fontWeight: '800',

  },
  ctnDetails: {
    padding: 5,
    flexWrap: 'wrap',
  },
  categoryOther: {
    borderRadius: 5,
    textAlign: 'center',
    color: '#fff',
    fontWeight: 'bold',
    backgroundColor: '#003FFF',
    padding: 2,
    width: 180,
  },
  categoryVolunteer: {
    borderRadius: 5,
    textAlign: 'center',
    color: '#fff',
    fontWeight: 'bold',
    backgroundColor: '#00860B',
    padding: 2,
    width: 80,
  },
  categoryEmergency: {
    borderRadius: 5,
    textAlign: 'center',
    color: '#fff',
    fontWeight: 'bold',
    backgroundColor: '#FF000F',
    padding: 2,
    width: 90,
  }
})