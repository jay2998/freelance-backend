import Order from '../models/Order.js'
import Gig from '../models/Gig.js'

export const createOrder = async (req, res) => {
  try {
    const gig = await Gig.findById(req.params.gigId)
    if (!gig) return res.status(404).json('Gig not found.')
    const order = new Order({
      gigId:    gig._id,
      buyerId:  req.userId,
      sellerId: gig.userId,
      title:    gig.title,
      price:    gig.price,
      cover:    gig.cover,
    })
    const saved = await order.save()
    res.status(201).json(saved)
  } catch (err) {
    res.status(500).json('Something went wrong.')
  }
}

export const getOrders = async (req, res) => {
  try {
    const orders = await Order.find(
      req.isSeller
        ? { sellerId: req.userId }
        : { buyerId: req.userId }
    ).sort({ createdAt: -1 })
    res.status(200).json(orders)
  } catch (err) {
    res.status(500).json('Something went wrong.')
  }
}

export const completeOrder = async (req, res) => {
  try {
    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { isCompleted: true },
      { new: true }
    )
    res.status(200).json(order)
  } catch (err) {
    res.status(500).json('Something went wrong.')
  }
}