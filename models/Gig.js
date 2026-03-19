import mongoose from 'mongoose'

const gigSchema = new mongoose.Schema({
  userId:       { type: String, required: true },
  title:        { type: String, required: true },
  desc:         { type: String, required: true },
  category:     { type: String, required: true },
  price:        { type: Number, required: true },
  cover:        { type: String, required: true },
  images:       { type: [String], default: [] },
  deliveryTime: { type: Number, required: true },
  totalStars:   { type: Number, default: 0 },
  starNumber:   { type: Number, default: 0 },
  sales:        { type: Number, default: 0 },
}, { timestamps: true })

export default mongoose.model('Gig', gigSchema)