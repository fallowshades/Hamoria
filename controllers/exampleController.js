import 'express-async-errors'

export const createExample = async (req, res) => {
  res.send('create example')
}

export const getAllExample = async (req, res) => {
  res.send('get All example')
}

export const getExample = async (req, res) => {
  res.send('get example')
}

export const updateExample = async (req, res) => {
  res.send('update example')
}

export const deleteExample = async (req, res) => {
  res.send('delete example')
}
