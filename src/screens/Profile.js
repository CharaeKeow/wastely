import React, { useEffect, useState } from 'react'
import {
  Button,
  View,
  Text
} from 'react-native'
import auth from '@react-native-firebase/auth'

export default function Profile({ navigation }) {
  const [user, setUser] = useState()

  useEffect(() => {
    let isMounted = true;

    if (isMounted) {
      let user = auth().currentUser
      setUser(user)
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
      <Text>{user.email}</Text>
      <Button
        title="Sign Out"
        onPress={() => signOut()}
      />
    </View>
  )


}