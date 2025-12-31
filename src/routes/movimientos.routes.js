import { Router } from 'express'
import { addPoints, changeCoupon, coinPoints, processActions, sendAccess, sendUrbiCoins, substractPoints, transferBalance } from '../controllers/index.js'

const router = Router()

router.post('/processActions/v2', processActions)

router.post('/send/access', sendAccess)

router.post('/addPoints', addPoints)

router.post('/transferBalance', sendUrbiCoins)

router.post('/changeCoupon', changeCoupon)

router.post('/coins_points', coinPoints)

router.post('/subtract/points', substractPoints)

export default router