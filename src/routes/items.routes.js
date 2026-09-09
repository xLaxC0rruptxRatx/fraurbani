import { Router } from 'express'
import { renderBal, updateItems } from '../controllers/index.js'
import { body, check } from 'express-validator'
import { fieldVal, itemsLimiter } from '../middlewares/index.js'

const router = Router()

router.get('/', renderBal)

router.post('/',
itemsLimiter,
[
  check('balance', 'Balance no puede estar vacío!').notEmpty(),
  check('freeTrip', 'Viajes gratis no puede estar vacío!').notEmpty(),
  fieldVal
], 
updateItems
)

export default router