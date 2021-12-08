import uuid from 'react-native-uuid';

export default async function fetchAnswer(question) {
  let answer = ''

  const response = await fetch('https://waste-app-chatbot.azurewebsites.net/qnamaker/knowledgebases/879bfa78-10f7-41ec-abb4-3bc2a53893b7/generateAnswer', {
    method: 'POST',
    headers: {
      'Authorization': "96725358-d107-48a2-8fe0-9c08947d5ebc",
      'Content-type': 'application/json'
    },
    body: JSON.stringify({
      'question': `${question}`
    })
  })

  return response.json()

  //return { id: uuid.v4(), answer: answer, type: 'answer' }
}