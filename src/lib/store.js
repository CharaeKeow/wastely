import { createState, useState } from '@hookstate/core'

const store = createState({
  location: [],
  errorMsg: [],
})

export default store