import React, { useEffect, useState } from 'react'
import {
  View,
  StyleSheet,
  Text
} from 'react-native'
import { Button } from 'react-native-paper'
import { ActivityIndicator, Colors } from 'react-native-paper'
import auth from '@react-native-firebase/auth'
import firestore from '@react-native-firebase/firestore'

export default function Profile({ navigation }) {
  const [user, setUser] = useState()
  const [uid, setUid] = useState()

  useEffect(async () => {
    let isMounted = true;

    if (isMounted) {
      let userId = auth().currentUser.uid
      setUid(userId)

      await firestore()
        .collection('Users')
        .get()
        .then(querySnapshot => {
          querySnapshot.forEach(documentSnapshot => {
            if (documentSnapshot.id === uid) {
              setUser(documentSnapshot.data())
            }
            console.log(documentSnapshot.data())
          })
        })
    }

    return () => isMounted = false
  }, [uid])

  //show empty view if user is null (initializing)
  if (!user) {
    return (
      <View style={styles.emptyView}>
        <ActivityIndicator animating={true} color={Colors.red800} />
      </View>
    )
  }

  function signOut() {
    auth()
      .signOut()
      .then(() => console.log('User signed out!'))
  }

  return (
    <View style={styles.viewContainer}>
      <View>
        <Text>{user.name}</Text>
        <Text>{user.email}</Text>
      </View>
      <Button
        mode="contained"
        color="#016FB9"
        style={styles.btnSignOut}
        onPress={() => signOut()}
      >Sign Out</Button>
    </View>
  )
}

const styles = StyleSheet.create({
  emptyView: {
    marginTop: 20,
  },
  viewContainer: {
    marginTop: 20,
    width: 350,
    flex: 1,
    flexDirection: 'column',
    alignContent: 'center',
    alignItems: 'center'
  },
  btnSignOut: {
    width: 200,
    alignSelf: 'center',
    marginTop: 20,
  }
})