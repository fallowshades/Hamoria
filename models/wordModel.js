import mongoose from 'mongoose'

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
})

export default mongoose.model('word', WordSchema)
