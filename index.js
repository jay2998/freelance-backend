import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
import authRoutes from './routes/auth.js'
import gigRoutes from './routes/gigs.js'
import orderRoutes from './routes/orders.js'
import reviewRoutes from './routes/reviews.js'

dotenv.config()
const app = express()

app.use(cors({ origin: 'http://localhost:5173', credentials: true }))
app.use(express.json({ limit: '10mb' }))
app.use(cookieParser())

app.use('/api/auth', authRoutes)
app.use('/api/gigs', gigRoutes)
app.use('/api/orders', orderRoutes)
app.use('/api/reviews', reviewRoutes)

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log('MongoDB connected')
    app.listen(process.env.PORT, () =>
      console.log(`Server on port ${process.env.PORT}`)
    )
  })
  .catch((err) => console.error(err))