import { readFile } from 'fs/promises'
import mongoose from 'mongoose'
import dotenv from 'dotenv'

import Reference from './models/referenceModel.js'

dotenv.config()
console.log('start')
try {
  await mongoose.connect(process.env.MONGO_URL)

  const jsonReference = JSON.parse(
    await readFile(
      new URL('./utils/mockWhat/mockReferenceData.json', import.meta.url)
    )
  )

  await Reference.deleteMany()
  await Reference.create(jsonReference)
  console.log('Success!!!')
  process.exit(0)
} catch (error) {
  console.log(error)
  process.exit(1)
}
