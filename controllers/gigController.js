import Gig from '../models/Gig.js'
import { v2 as cloudinary } from 'cloudinary'
import dotenv from 'dotenv'
dotenv.config()

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key:    process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

export const uploadImage = async (req, res) => {
  try {
    const result = await cloudinary.uploader.upload(req.body.image, {
      folder: 'marketplace',
    })
    res.status(200).json(result.secure_url)
  } catch (err) {
    res.status(500).json('Image upload failed.')
  }
}

export const createGig = async (req, res) => {
  if (!req.isSeller) return res.status(403).json('Only sellers can create gigs.')
  try {
    const gig = new Gig({ userId: req.userId, ...req.body })
    const saved = await gig.save()
    res.status(201).json(saved)
  } catch (err) {
    res.status(500).json('Something went wrong.')
  }
}

export const getGig = async (req, res) => {
  try {
    const gig = await Gig.findById(req.params.id)
    if (!gig) return res.status(404).json('Gig not found.')
    res.status(200).json(gig)
  } catch (err) {
    res.status(500).json('Something went wrong.')
  }
}

export const getGigs = async (req, res) => {
  try {
    const { cat, search, sort } = req.query
    const filters = {
      ...(cat && { category: cat }),
      ...(search && { title: { $regex: search, $options: 'i' } }),
    }
    const gigs = await Gig.find(filters).sort({ [sort || 'createdAt']: -1 })
    res.status(200).json(gigs)
  } catch (err) {
    res.status(500).json('Something went wrong.')
  }
}

export const getMyGigs = async (req, res) => {
  try {
    const gigs = await Gig.find({ userId: req.userId })
    res.status(200).json(gigs)
  } catch (err) {
    res.status(500).json('Something went wrong.')
  }
}

export const deleteGig = async (req, res) => {
  try {
    const gig = await Gig.findById(req.params.id)
    if (!gig) return res.status(404).json('Gig not found.')
    if (gig.userId !== req.userId) return res.status(403).json('Unauthorized.')
    await Gig.findByIdAndDelete(req.params.id)
    res.status(200).json('Gig deleted.')
  } catch (err) {
    res.status(500).json('Something went wrong.')
  }
}