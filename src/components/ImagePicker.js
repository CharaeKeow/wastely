import React, { useState, useEffect } from 'react'
import {
  Button,
  Image,
  Platform,
  StyleSheet,
  View,
} from 'react-native'
import * as ImagePicker from 'expo-image-picker'

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
      <Button title="Add Image" onPress={pickImage} />
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
  }
})