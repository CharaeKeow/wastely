import React, { useState, useEffect } from 'react'
import {
  Pressable,
  Image,
  Platform,
  StyleSheet,
  Text,
  View,
} from 'react-native'
import * as ImagePicker from 'expo-image-picker'
import { Button } from 'react-native-paper'
import auth from '@react-native-firebase/auth'
import storage from '@react-native-firebase/storage'

export default function ImagePickerComponent({ setImageURL }) {
  const [image, setImage] = useState(null)
  const [uid, setUid] = useState()

  useEffect(() => {
    (async () => {
      if (Platform.OS !== 'web') {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync
        if (status !== 'granted') {
          //TODO: add handling to show only this alert if and only if user declined the permission
          //alert(`Sorry we need the permission to pick image from your device!`)
        }
      }
    })()
  }, [])

  useEffect(() => {
    let userId = auth().currentUser.uid
    setUid(userId)
  }, [])

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: false,
      aspect: [4, 3],
      quality: 1,
    })

    if (!result.cancelled) {
      setImage(result.uri)
    }

    //firebase storage bucket reference
    const reference = storage().ref(result.uri)
    //upload file
    await reference.putFile(result.uri)
    const url = await storage().ref(result.uri).getDownloadURL()
    if (url) {
      setImageURL(url)
    }
  }

  return (
    <View>
      <Button mode="contained" onPress={pickImage} style={styles.addImageBtn}>
        Add Image
      </Button>
      {image && <Image source={{ uri: image }} style={styles.img} />}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }, img: {
    width: 200,
    height: 200,
    alignSelf: 'center'
  }, addImageBtn: {
    //width: 150,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    marginTop: 20,
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
    elevation: 3,
    backgroundColor: '#016FB9',
    marginBottom: 20,
  }, btnText: {
    fontSize: 16,
    color: 'white',
    fontWeight: 'bold'
  }, emptyView: {
    width: 300,
    height: 300,
    backgroundColor: '#fff',
  }
})