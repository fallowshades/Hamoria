import mongoose from 'mongoose'

import { singleHandPrefix } from '../utils/foraignArrays.js'

const WordSchema = new mongoose.Schema({
  orderID: String,
  word: {
    type: String,
    required: true,
    default: NaN,
  },
  subgroup: {
    type: String,
    required: true,
    default: NaN,
  },
  subsection: {
    type: String,
    required: true,
    default: NaN,
  },
  prefixid: [singleHandPrefix],
})

export default mongoose.model('word', WordSchema)
