import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email:    { type: String, required: true, unique: true },
  password: { type: String, required: true },
  isSeller: { type: Boolean, default: false },
  image:    { type: String, default: '' },
  country:  { type: String, required: true },
  desc:     { type: String, default: '' },
}, { timestamps: true })

export default mongoose.model('User', userSchema)