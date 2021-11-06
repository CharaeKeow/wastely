import * as React from 'react';
import { Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Entypo, MaterialCommunityIcons } from '@expo/vector-icons'

import Profile from './Profile';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

function HomeScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Home!</Text>
    </View>
  );
}

function ExploreScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Explore!</Text>
    </View>
  );
}

const Tab = createBottomTabNavigator()
const Stack = createNativeStackNavigator()

function BottomTab({ navigation }) {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={({ navigation }) => ({
          headerRight: () => (
            <MaterialCommunityIcons
              style={{ marginRight: 15 }}
              name="account-circle-outline"
              size={24}
              color="black"
              onPress={() => navigation.navigate('Profile')} />
          ),
          tabBarLabel: 'Home',
          tabBarIcon: ({ color, size }) => (
            <Entypo name="home" color={color} size={size} />
          ),
        })} />
      <Tab.Screen
        name="Explore"
        component={ExploreScreen}
        options={{
          tabBarLabel: 'Explore',
          tabBarIcon: ({ color, size }) => (
            <Entypo name="map" color={color} size={size} />
          ),
        }} />
    </Tab.Navigator>
  )
}

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