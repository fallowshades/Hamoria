import { nanoid } from 'nanoid'

let achievements = [
  { id: nanoid(), description: 'start', track: 'front-end developer' },
  { id: nanoid(), description: 'end', track: 'back-end developer' },
]

export const getAllAchievements = async (req, res) => {
  res.status(200).json({ achievements })
}

export const createAchievement = async (req, res) => {
  const { description, track } = req.body

  if (!description || !track) {
    return res.status(400).json({ msg: 'please provide description and track' })
  }
  const id = nanoid(10)
  const achievement = { id, description, track }
  achievements.push(achievement)
  res.status(200).json({ achievement })
}

export const getAchievement = async (req, res) => {
  const { id } = req.params
  const achievement = achievements.find((achievement) => achievement.id === id)
  if (!achievement) {
    // throw new Error('no achievement with that id');
    return res.status(404).json({ msg: `no achievement with id ${id}` })
  }
  res.status(200).json({ achievement })
}

export const updateAchievement = async (req, res) => {
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
}

export const deleteAchievement = async (req, res) => {
  const { id } = req.params
  const achievement = achievements.find((achievement) => achievement.id === id)
  if (!achievement) {
    return res.status(404).json({ msg: `no job with id ${id}` })
  }
  const newAchievements = achievements.filter(
    (achievement) => achievement.id !== id
  )
  achievements = newAchievements

  res.status(200).json({ msg: 'achievement deleted' })
}
