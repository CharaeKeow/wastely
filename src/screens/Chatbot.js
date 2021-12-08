import React, { useState, useEffect } from 'react'
import {
  Button,
  Text,
  TextInput,
  SafeAreaView,
  TouchableOpacity,
  StyleSheet,
  View,
  FlatList
} from 'react-native'
import { ScrollView } from 'react-native-gesture-handler';
import uuid from 'react-native-uuid';

import fetchAnswer from '../lib/qnaMaker'

export default function Chatbot() {
  const [text, onChangeText] = useState("")
  const [messages, setMessages] = useState(false)

  async function onSend() {
    let array = []
    if (messages !== false) {
      array = messages
    }
    array.push({
      id: uuid.v4(),
      message: text,
      type: 'question'
    })
    let response = fetchAnswer(text)
    response.then(data => {
      array.push({
        id: uuid.v4(),
        message: data.answers[0].answer,
        type: 'answer'
      })
    })
    console.log(response)
    //array.push(response)
    setMessages(array)
    onChangeText('') //reset text
    console.log(messages)
  }

  const Item = ({ item }) => (

    <View style={item.type === 'question' ? styles.question : styles.answer}>
      <Text style={item.type === 'question' ? styles.questionText : styles.answerText}>{item.message}</Text>
    </View>
  )

  const renderItem = ({ item }) => (
    <Item
      id={item.id}
      item={item}
    />
  )

  return (
    <View style={styles.container}>
      <FlatList
        style={styles.chat}
        data={messages}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
      <View style={styles.textArea}>
        <TextInput
          style={styles.textBox}
          onChangeText={onChangeText}
          placeholder="Ask a question"
          value={text}
        />
        <Button onPress={onSend} title="Send" />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    flex: 1,
  }, header: {

    marginBottom: 10,
    textAlign: 'center',
    fontSize: 25,
    color: '#000',
  }, textArea: {
    bottom: 0,
    alignSelf: 'flex-end',
    width: '100%',
    backgroundColor: '#fff',
  }, textBox: {
    borderColor: '#888',
    padding: 5,
    paddingLeft: 10,
    borderWidth: 1,
    color: '#000'
  }, question: {
    backgroundColor: '#0865FF',
    marginBottom: 10,
    width: 300,
    marginLeft: '23%',
    marginRight: 0,
    color: '#fff',
    padding: 3,
    borderRadius: 5,
  }, answer: {
    backgroundColor: '#fff',
    width: 330,
    marginBottom: 10,
    marginLeft: 10,
  },
  questionText: {
    color: '#fff',
    padding: 5,
  },
  answerText: {
    color: '#000',
    padding: 10,
  },
  chat: {
    marginBottom: 10,
  }
})