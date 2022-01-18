import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import auth from '@react-native-firebase/auth'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as HookState from '@hookstate/core'
import * as Location from 'expo-location'

import store from './src/lib/store'
import AppStack from "./src/screens/AppStack"
import Login from "./src/screens/Login"
import Registration from './src/screens/Registration'

export default function App() {
  const [initializing, setInitializing] = useState(true)
  const [user, setUser] = useState()
  const { location, errorMsg } = HookState.useState(store) // hookstate usestate

  function onAuthStateChanged(user) {
    setUser(user)
    if (initializing) setInitializing(false)
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged)
    return subscriber //unsubscribe on mount
  }, [])

  useEffect(() => {
    if (user) {
      (async () => {
        let { status } = await Location.requestForegroundPermissionsAsync()
        if (status !== 'granted') {
          errorMsg.set('Permission to access location was denied')
          return
        }

        let l = await Location.getCurrentPositionAsync({})
        location.set(l)
        console.log()
      })()
    }
  })

  if (initializing) return null

  const Stack = createNativeStackNavigator()

  if (!user) {
    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Registration" component={Registration} />
        </Stack.Navigator>
      </NavigationContainer>
    )
  }

  if (!location.get().coords) {
    console.log(location.get())
    return (
      <Text>Waiting</Text>
    )
  }

  return (
    <>
      <AppStack />
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
