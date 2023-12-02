import { readFile } from 'fs/promises'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import Prefix from './models/prefixModel.js'

import Word from './models/wordModel.js'

dotenv.config()
console.log('start')
try {
  await mongoose.connect(process.env.MONGO_URL)

  const prefixes = await Prefix.find({})
  // console.log(prefixes)

  const jsonWord = JSON.parse(
    await readFile(
      new URL('./utils/mockWhat/mockWord150Data.json', import.meta.url)
    )
  )

  const updatedWords = jsonWord.map((word) => {
    if (
      word.prefix_id &&
      prefixes.some((prefix) => prefix.Connectionid === word.prefix_id)
    ) {
      const connection = prefixes.find(
        (prefix) => prefix.Connectionid == word.prefix_id
      )
      console.log({ connection })
      return {
        ...word,
        prefixid: {
          connection_id: connection.Connectionid,
          position: connection.position,
          hand: connection.hand,
        },
      }
    }
    return { ...word }
  })

  await Word.deleteMany()
  await Word.create(jsonPrefix)
  console.log('Success!!!')
  process.exit(0)
} catch (error) {
  console.log(error)
  process.exit(1)
}
