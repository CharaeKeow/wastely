import React, { useEffect } from 'react'
import {
  Image,
  Text,
  StyleSheet,
  View,
} from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'

import styles from '../styles/Listing.style'

export default function Listing({ item, navigation }) {
  return (
    <TouchableOpacity
      style={styles.item}
      onPress={() => navigation.navigate('MyListingDetailScreen', { obj: item })}
    >
      <View>
        <Image style={styles.img} source={{ uri: item.imageURL }} />
      </View>
      <View style={styles.ctnDetails}>
        <Text style={item.category === 'Food' ? styles.categoryFood : item.category === 'Non-Food' ? styles.categoryNonFood : styles.categoryHelp}>{item.category}</Text>
        <Text style={styles.title}>{item.title}</Text>
        <Text>{item.donorName}</Text>
        <Text>{item.isClaimed ? 'Claimed' : 'Unclaimed'}</Text>
        <Text>{item.isPickedUp ? 'Sent' : ''}</Text>
      </View>
    </TouchableOpacity>
  )
}