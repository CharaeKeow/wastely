import * as React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import BottomTab from './BottomTab'
import Profile from './Profile'

const Stack = createNativeStackNavigator()

export default function Home({ navigation }) {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="BottomTab" component={BottomTab} />
        <Stack.Screen name="Profile" component={Profile} options={{ headerShown: true }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}