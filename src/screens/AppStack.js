import * as React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import BottomTab from './BottomTab'
import Profile from './Profile'
import AddItem from "./AddItem"
import AddRequest from "./AddRequest"
import DetailScreen from './DetailScreen'
import MyListingDetailScreen from './MyListingDetailScreen'
import RequestDetailScreen from './RequestDetailScreen'

const Stack = createNativeStackNavigator()

export default function Home({ navigation }) {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="BottomTab" component={BottomTab} />
        <Stack.Screen name="Profile" component={Profile} options={{ headerShown: true }} />
        <Stack.Screen name="AddItem" component={AddItem} options={{ headerShown: true }} />
        <Stack.Screen name="AddRequest" component={AddRequest} options={{ headerShown: true }} />
        <Stack.Screen name="DetailScreen" component={DetailScreen} options={{ headerShown: true }} />
        <Stack.Screen name="MyListingDetailScreen" component={MyListingDetailScreen} options={{ headerShown: true }} />
        <Stack.Screen name="RequestDetailScreen" component={RequestDetailScreen} options={{ headerShown: true }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}