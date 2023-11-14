import { nanoid } from 'nanoid'
import Sign from '../models/signModel.js'

let signs = [
  { id: nanoid(), description: 'start', track: 'front-end developer' },
  { id: nanoid(), description: 'end', track: 'back-end developer' },
]
export const getAllSigns = async (req, res) => {
  res.status(200).json({ signs })
}

export const createSign = async (req, res) => {
  const { title, price, description, category, company, colors } = req.body
  const sign = await Sign.create({
    title,
    price,
    description,
    category,
    company,
    colors,
  })

  res.status(200).json({ sign })
}

export const getSign = async (req, res) => {
  const { id } = req.params
  const sign = signs.find((sign) => sign.id === id)
  if (!sign) {
    // throw new Error('no sign with that id');
    return res.status(404).json({ msg: `no sign with id ${id}` })
  }
  res.status(200).json({ sign })
}

export const updateSign = async (req, res) => {
  const { description, track } = req.body
  if (!description || !track) {
    return res.status(400).json({ msg: 'please provide description and track' })
  }
  const { id } = req.params
  const sign = signs.find((sign) => sign.id === id)
  if (!sign) {
    return res.status(404).json({ msg: `no sign with id ${id}` })
  }

  sign.description = description
  sign.track = track
  res.status(200).json({ msg: 'sign modified', sign })
}

export const deleteSign = async (req, res) => {
  const { id } = req.params
  const sign = signs.find((sign) => sign.id === id)
  if (!sign) {
    return res.status(404).json({ msg: `no sign with id ${id}` })
  }
  const newSigns = signs.filter((sign) => sign.id !== id)
  signs = newSigns

  res.status(200).json({ msg: 'sign deleted' })
}
