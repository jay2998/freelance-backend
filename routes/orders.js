import express from 'express'
import { verifyToken } from '../middleware/verifyToken.js'
import { createOrder, getOrders, completeOrder } from '../controllers/orderController.js'

const router = express.Router()

router.post('/:gigId',    verifyToken, createOrder)
router.get('/',           verifyToken, getOrders)
router.put('/:id',        verifyToken, completeOrder)

export default router