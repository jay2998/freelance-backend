import express from 'express'
import { verifyToken } from '../middleware/verifyToken.js'
import {
  createGig, deleteGig, getGig,
  getGigs, getMyGigs, uploadImage
} from '../controllers/gigController.js'

const router = express.Router()

router.post('/upload',   verifyToken, uploadImage)
router.post('/',         verifyToken, createGig)
router.delete('/:id',   verifyToken, deleteGig)
router.get('/my',        verifyToken, getMyGigs)
router.get('/single/:id', getGig)
router.get('/',          getGigs)

export default router