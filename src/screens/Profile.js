import React, { useEffect, useState } from 'react'
import {
  Button,
  View,
  Text
} from 'react-native'
import auth from '@react-native-firebase/auth'
import firestore from '@react-native-firebase/firestore'

export default function Profile({ navigation }) {
  const [user, setUser] = useState()

  useEffect(async () => {
    let isMounted = true;

    if (isMounted) {
      await firestore()
        .collection('Users')
        .get()
        .then(querySnapshot => {
          querySnapshot.forEach(documentSnapshot => {
            setUser(documentSnapshot.data())
            console.log(documentSnapshot.data())
          })
        })
    }

    return () => isMounted = false
  }, [])

  //show empty view if user is null (initializing)
  if (!user) {
    return (
      <View></View>
    )
  }

  function signOut() {
    auth()
      .signOut()
      .then(() => console.log('User signed out!'))
  }

  return (
    <View>
      <Text>{user.name}</Text>
      <Text>{user.email}</Text>
      <Button
        title="Sign Out"
        onPress={() => signOut()}
      />
    </View>
  )


}