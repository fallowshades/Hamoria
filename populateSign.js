import { readFile } from 'fs/promises'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import Prefix from './models/prefixModel.js'
import Orientation from './models/orientationModel.js'

import Sign from './models/signModel.js'

dotenv.config()
console.log('start')
try {
  await mongoose.connect(process.env.MONGO_URL)

  const prefixes = await Prefix.find({})
  console.log(prefixes)
  const orientations = await Orientation.find({})
  console.log(orientations)
  const jsonSign = JSON.parse(
    await readFile(
      new URL('./utils/mockWhat/mockHandStatusData.json', import.meta.url)
    )
  )

  const Signs = jsonSign.map((sign) => {
    const prefixSigns = prefixes.filter(
      (prefix) => prefix.orderid == sign.orderid
    )

    return { ...sign, prefixSigns }
  })
  console.log(Signs)

  //await Sign.deleteMany()
  //await Sign.create(jsonPrefix)
  console.log('Success!!!')
  process.exit(0)
} catch (error) {
  console.log(error)
  process.exit(1)
}
