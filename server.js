import express from 'express'
import morgan from 'morgan'
import * as dotenv from 'dotenv'
import { nanoid } from 'nanoid'
dotenv.config()

const app = express()

app.use(express.json())

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'))
}

let achievements = [
  { id: nanoid(), description: 'start intro', track: false },
  { id: nanoid(), description: 'complete intro', track: false },
]

app.get('/api/v1/achievements', (req, res) => {
  res.status(200).json({ achievements })
})

// CREATE JOB (ignore other than string for now)

app.post('/api/v1/achievements', (req, res) => {
  const { description, track } = req.body //cant recive boolean
  if (!description || !track) {
    return res.status(400).json({ msg: 'please provide description and track' })
  }
  const id = nanoid(10)
  console.log(id)
  const achievement = { id, description, track }
  achievements.push(achievement)
  res.status(200).json({ achievement })
})

// GET SINGLE JOB

app.get('/api/v1/achievements/:id', (req, res) => {
  const { id } = req.params
  const achievement = achievements.find((achievement) => achievement.id === id)
  if (!achievement) {
    throw new Error('no achievement with that id')
    return res.status(404).json({ msg: `no achievement with id ${id}` })
  }
  res.status(200).json({ achievement })
})

app.patch('/api/v1/achievements/:id', (req, res) => {
  const { description, track } = req.body
  if (!description || !track) {
    return res.status(400).json({ msg: 'please provide description and track' })
  }
  const { id } = req.params
  const achievement = achievements.find((achievement) => achievement.id === id)
  if (!achievement) {
    return res.status(404).json({ msg: `no achievement with id ${id}` })
  }

  achievement.description = description
  achievement.track = track
  res.status(200).json({ msg: 'achievement modified', achievement })
})

// DELETE achievement

app.delete('/api/v1/achievements/:id', (req, res) => {
  const { id } = req.params
  const achievement = achievements.find((achievement) => achievement.id === id)
  console.log('p')
  if (!achievement) {
    return res.status(404).json({ msg: `no achievement with id ${id}` })
  }
  console.log('o')
  const newAchievements = achievements.filter(
    (achievement) => achievement.id !== id
  )
  achievements = newAchievements //misstake spelling achievements made it a constant
  console.log('l')
  res.status(200).json({ msg: 'achievement deleted' })
})

app.use('*', (req, res) => {
  res.status(404).json({ msg: 'not found' })
})

app.use((err, req, res, next) => {
  console.log(err)
  res.status(500).json({ msg: 'something went wrong' })
})

const port = process.env.PORT || 5100
app.listen(port, () => {
  console.log(`server running on PORT ${port}....`)
})
