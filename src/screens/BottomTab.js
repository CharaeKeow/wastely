import * as React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Entypo, MaterialCommunityIcons } from '@expo/vector-icons'

import HomeScreen from './HomeScreen';
import ExploreScreen from './ExploreScreen'
import MyListing from './MyListing';
import Chatbot from './Chatbot';

const Tab = createBottomTabNavigator()

export default function BottomTab({ navigation }) {
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
      <Tab.Screen
        name="MyListing"
        component={MyListing}
        options={{
          tabBarLabel: 'My Listing',
          tabBarIcon: ({ color, size }) => (
            <Entypo name="list" color={color} size={size} />
          )
        }}
      />
      <Tab.Screen
        name="Chatbot"
        component={Chatbot}
        options={{
          tabBarLabel: 'Chatbot',
          tabBarIcon: ({ color, size }) => (
            <Entypo name="chat" color={color} size={size} />
          )
        }}
      />
    </Tab.Navigator>
  )
}