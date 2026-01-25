import { sendMessage } from '../controllers/index.js'
import { commentLimiter } from '../middlewares/index.js'
import { Router } from 'express'

const router = Router()

router.post('/', commentLimiter, sendMessage)

export default router