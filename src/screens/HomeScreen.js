import React, { useState, useEffect } from 'react'
import {
  Image,
  FlatList,
  StyleSheet,
  Text,
  View,
} from 'react-native'
import { FAB } from 'react-native-paper'

import styles from '../styles/HomeScreen.style'
import Item from '../components/Item';

export default function HomeScreen({ navigation }) {
  const [data, setData] = useState()
  useEffect(() => {
    let arr = []
    let items = require('../../assets/sample-data/items.json')
    items.items.forEach(item => {
      arr.push({
        id: item.id,
        title: item.title,
        image: item.image,
        quantity: item.quantity,
        donorName: item.donorName,
        description: item.description,
      })
    })
    setData(arr)
    //console.log(data)
  }, [])

  const renderItem = ({ item }) => {
    return <Item item={item} navigation={navigation} />
  }

  return (
    <View>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
      <FAB
        style={styles.fab}
        big
        icon="plus"
        onPress={() => navigation.navigate('AddItem')}
      />
    </View>
  );
}
