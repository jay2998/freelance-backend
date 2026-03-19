import Review from '../models/Review.js'
import Gig from '../models/Gig.js'

export const createReview = async (req, res) => {
  try {
    const existing = await Review.findOne({
      gigId: req.body.gigId,
      userId: req.userId
    })
    if (existing) return res.status(400).json('You already reviewed this gig.')

    const review = new Review({ userId: req.userId, ...req.body })
    await review.save()

    await Gig.findByIdAndUpdate(req.body.gigId, {
      $inc: { totalStars: req.body.star, starNumber: 1 }
    })

    res.status(201).json(review)
  } catch (err) {
    res.status(500).json('Something went wrong.')
  }
}

export const getReviews = async (req, res) => {
  try {
    const reviews = await Review.find({ gigId: req.params.gigId })
      .sort({ createdAt: -1 })
    res.status(200).json(reviews)
  } catch (err) {
    res.status(500).json('Something went wrong.')
  }
}