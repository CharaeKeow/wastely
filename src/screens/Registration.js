import React from 'react';
import { Image, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import auth from '@react-native-firebase/auth'
import firestore from '@react-native-firebase/firestore'

import styles from '../styles/Registration.style';

export default function Registration({ navigation }) {
  const [fullName, setFullName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [confirmPassword, setConfirmPassword] = React.useState('');

  const onFooterLinkPress = () => {
    navigation.navigate('Login');
  }

  const onRegisterPress = () => {
    if (password !== confirmPassword) { //alert password doesn't match
      alert("Passwords do not match!");
    } else {
      auth()
        .createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
          firestore()
            .collection('Users')
            .doc(userCredential.uid)
            .set({
              name: fullName,
              email: email,
            }).catch(error => console.error(error))
          console.log(userCredential)
          console.log('User account created and signed in!')
        })
        .catch(error => {
          if (error.code == 'auth/email-already-in-use') {
            console.log('That email address is already in use!')
          }

          if (error.code == 'auth/invalid-email') {
            console.log('That email address is invalid')
          }

          console.error(error)
        })
    }
  }

  return (
    <View style={styles.container}>
      <KeyboardAwareScrollView
        style={styles.keyboardAwareScrollView} keyboardShouldPersistTaps="always">
        <TextInput
          style={styles.input}
          placeholder='Full Name'
          placeholderTextColor="#aaaaaa"
          onChangeText={(text) => setFullName(text)}
          value={fullName}
          underlineColorAndroid="transparent"
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          placeholder='E-mail'
          placeholderTextColor="#aaaaaa"
          onChangeText={(text) => setEmail(text)}
          value={email}
          underlineColorAndroid="transparent"
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          placeholderTextColor="#aaaaaa"
          secureTextEntry
          placeholder='Password'
          onChangeText={(text) => setPassword(text)}
          value={password}
          underlineColorAndroid="transparent"
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          placeholderTextColor="#aaaaaa"
          secureTextEntry
          placeholder='Confirm Password'
          onChangeText={(text) => setConfirmPassword(text)}
          value={confirmPassword}
          underlineColorAndroid="transparent"
          autoCapitalize="none"
        />
        <TouchableOpacity
          style={styles.button}
          onPress={() => onRegisterPress()}>
          <Text style={styles.buttonTitle}>Create account</Text>
        </TouchableOpacity>
        <View style={styles.footerView}>
          <Text style={styles.footerText}>Already got an account?
            <Text onPress={onFooterLinkPress} style={styles.footerLink}> Login</Text>
          </Text>
        </View>
      </KeyboardAwareScrollView>
    </View>
  )
}