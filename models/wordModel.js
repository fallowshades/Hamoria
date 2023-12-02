import mongoose from 'mongoose'

import { singleHandPrefix } from '../utils/foraignArrays.js'

const WordSchema = new mongoose.Schema({
  orderID: String,
  word: {
    type: String,
    required: true,
  },
  subgroup: {
    type: String,
    required: true,
  },
  subsection: {
    type: String,
    required: true,
  },
  prefixid: [singleHandPrefix],
})

export default mongoose.model('word', WordSchema)
