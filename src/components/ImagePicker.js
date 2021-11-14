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

export default function ImagePickerComponent() {
  const [image, setImage] = useState(null)

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

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    })

    console.log(result)

    if (!result.cancelled) {
      setImage(result.uri)
    }
  }

  return (
    <View>

      <Button mode="contained" onPress={pickImage} style={styles.addImageBtn}>
        Add Item
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
    width: 300,
    height: 300,
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
    backgroundColor: '#003D66'
  }, btnText: {
    fontSize: 16,
    color: 'white',
    fontWeight: 'bold'
  }
})