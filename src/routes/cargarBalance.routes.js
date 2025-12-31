import { Router } from 'express'
import { cargarBalance, cargarConfig, cargarFlags, getHour, getUserId, infoCoinPoints, ratesV3, userV2, v2URL } from '../controllers/index.js'

const router = Router()

router.get('/userBalances', cargarBalance)

router.get('/config/v2', cargarConfig)

router.get('/userFlags', cargarFlags)

router.get('/hour', getHour)

router.get('/userV2', userV2)

router.get('/user/:phone', getUserId)

router.get('/v2/info_coins_points', infoCoinPoints)

router.post('/rates/v3', ratesV3)

router.get('/v2/url', v2URL)

export default router