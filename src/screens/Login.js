import React from 'react'
import { Alert, Image, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import auth from '@react-native-firebase/auth'

import styles from '../styles/Login.style'

export default function Login({ navigation }) {
  const [email, setEmail] = React.useState('') //initial state null
  const [password, setPassword] = React.useState('')

  const onFooterLinkPress = () => {
    navigation.navigate('Registration');
  }

  const onLoginPress = () => {
    auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        console.log('Logged in successfully')
      })
      .catch(error => {
        if (error.code === 'auth/invalid-email') {
          console.log('That email address is invalid')
        }

        if (error.code === 'auth/user-not-found') {
          console.log('No user record is found for this email')
        }
        console.error(error)
      })
  }

  return (
    <View style={styles.container}>
      <KeyboardAwareScrollView
        style={styles.keyboardAwareScrollView}
        keyboardShouldPersistTaps='always'>
        <TextInput //email
          style={styles.input}
          placeholder="E-mail"
          placeholderTextColor="#aaaaaa"
          onChangeText={(text) => setEmail(text)}
          value={email}
          underlineColorAndroid="transparent"
          autoCapitalize="none"
        />
        <TextInput //password
          style={styles.input}
          secureTextEntry
          placeholder="Password"
          placeholderTextColor="#aaaaaa"
          onChangeText={(text) => setPassword(text)}
          value={password}
          underlineColorAndroid="transparent"
          autoCapitalize="none"
        />
        <TouchableOpacity
          style={styles.button}
          onPress={() => onLoginPress()}>
          <Text style={styles.buttonTitle}>Log in</Text>
        </TouchableOpacity>
        <View style={styles.footerView}>
          <Text style={styles.footerText}>Don't have an account?
            <Text onPress={onFooterLinkPress} style={styles.footerLink}> Sign Up</Text>
          </Text>
        </View>
      </KeyboardAwareScrollView>
    </View>
  )
}