import { readFile } from 'fs/promises'
import mongoose from 'mongoose'
import dotenv from 'dotenv'

import Orientation from './models/orientationModel.js'

dotenv.config()

try {
  await mongoose.connect(process.env.MONGO_URL)

  const jsonOrientation = JSON.parse(
    await readFile(new URL('./utils/mockOrientationData.json', import.meta.url))
  )

  const manyOrientation = jsonOrientation.map((orientation) => {
    return { ...orientation }
  })
  //await Orientation.deleteMany()
  //await Orientation.create(manyOrientation)
  console.log('Success!!!')
  process.exit(0)
} catch (error) {
  console.log(error)
  process.exit(1)
}
