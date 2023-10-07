import express from 'express'
import morgan from 'morgan'
import * as dotenv from 'dotenv'
dotenv.config()

const app = express()

app.use(express.json())

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'))
  console.log('developing')
}

const port = process.env.PORT || 5100
app.listen(port, () => {
  console.log(`server running on PORT ${port}....`)
})
