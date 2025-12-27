import { Router } from 'express'
import { cargarBalance, cargarConfig, cargarFlags, getHour, getUserId, userV2 } from '../controllers/index.js'
import extractUID from '../middlewares/extractUID.js'

const router = Router()

router.get('/userBalances', cargarBalance)

//router.get('/config/v2', cargarConfig)

//router.get('/userFlags', cargarFlags)

router.get('/hour', getHour)

router.get('/userV2', userV2)

router.get('/user/:phone', getUserId)

export default router