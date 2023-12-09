import { readFile } from 'fs/promises'
import dotenv from 'dotenv'
import mongoose from 'mongoose'

import Prefix from './models/prefixModel.js'

dotenv.config()
console.log('start')
try {
  await mongoose.connect(process.env.MONGO_URL)

  const jsonPrefix = JSON.parse(
    await readFile(
      new URL('./utils/mockWhat/mockPrefixData.json', import.meta.url)
    )
  )
  /*
  const manyOrientation = jsonOrientation.map((orientation) => {
    return { ...orientation }
  })
  */

  await Prefix.deleteMany()
  await Prefix.create(jsonPrefix)
  console.log('Success!!!')
  process.exit(0)
} catch (error) {
  console.log(error)
  process.exit(1)
}
