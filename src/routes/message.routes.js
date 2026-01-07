import { sendMessage } from '../controllers/index.js'
import { Router } from 'express'

const router = Router()

router.post('/', sendMessage)

export default router