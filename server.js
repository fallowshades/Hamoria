import express from 'express'
import morgan from 'morgan'
import * as dotenv from 'dotenv'
import achievementRouter from './routes/achievementRouter.js'
import mongoose from 'mongoose'
import errorHandlerMiddleware from './middleware/errorHandlerMiddleware.js'

import { body, validationResult } from 'express-validator'

import authRouter from './routes/authRouter.js'

dotenv.config()

const app = express()

app.use(express.json())

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'))
}

app.use('/api/v1/achievements', achievementRouter)
app.use('/api/v1/auth', authRouter)

app.use('*', (req, res) => {
  res.status(404).json({ msg: 'not found' })
})

app.use(errorHandlerMiddleware)

const port = process.env.PORT || 5100

try {
  await mongoose.connect(process.env.MONGO_URL)
  app.listen(port, () => {
    console.log(`server running on PORT ${port}....`)
  })
} catch (error) {
  console.log(error)
  process.exit(1)
}
