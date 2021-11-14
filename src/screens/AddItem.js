import React, { useEffect, useState } from "react"
import {
  Button,
  StyleSheet,
  Text,
  View,
} from 'react-native'

import auth from '@react-native-firebase/auth'

export default function AddItem() {

  useEffect(() => {
    const user = auth().currentUser
    console.log(user.uid)
  })

  return (
    <View>
      <Text>Add Item</Text>
    </View>
  )
}