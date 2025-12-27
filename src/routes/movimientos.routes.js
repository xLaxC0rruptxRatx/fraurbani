import { Router } from 'express'
import { addPoints, processActions, sendAccess, sendUrbiCoins } from '../controllers/index.js'

const router = Router()

router.post('/processActions/v2', processActions)

router.post('/send/access', sendAccess)

router.post('/addPoints', addPoints)

router.post('/transferBalance', sendUrbiCoins)

export default router