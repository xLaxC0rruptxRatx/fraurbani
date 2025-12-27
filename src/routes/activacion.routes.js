import { Router } from 'express'
import { activar } from '../controllers/index.js'

const router = Router()

router.get('/', activar)

export default router