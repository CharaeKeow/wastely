export default async function fetchAnswer(question) {
  let answer = ''

  const response = await fetch('http://192.168.49.160:8000/ask', {
    method: 'POST',
    headers: {
      'Content-type': 'application/json'
    },
    body: JSON.stringify({
      'question': `${question}`
    })
  })

  return response.json()
}