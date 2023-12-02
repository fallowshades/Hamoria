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

  const orientations = await Orientation.find({})
  console.log(orientations)
  const jsonSign = JSON.parse(
    await readFile(
      new URL('./utils/mockWhat/mockHandStatusData.json', import.meta.url)
    )
  )

  const Signs = jsonSign.map((sign) => {
    const correspondingOrder2 = orientations.find(
      (order) => order.orderid === sign.orderid
    )

    return {
      ...sign,
      order: {
        fingerdirection: correspondingOrder2.fingerdirection,
        fingerdirection2: correspondingOrder2.fingerdirection2,
        palmdirection: correspondingOrder2.palmdirection,
        palmdirection2: correspondingOrder2.palmdirection2,
        singlehandform: correspondingOrder2.singlehandform,
      },
    }
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
