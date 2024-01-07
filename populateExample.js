import { readFile } from 'fs/promises'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
dotenv.config()

import Example from './models/exampleModel.js'

try {
  await mongoose.connect(process.env.MONGO_URL)

  const jsonExamples = JSON.parse(
    await readFile(
      new URL('./utils/mockWhat/courses/domainMocData.json', import.meta.url)
    )
  )

  await Example.deleteMany({})
  await Example.create(jsonExamples)
  console.log('Success!!!')
  process.exit(0)
} catch (error) {
  console.log(error)
  process.exit(1)
}
