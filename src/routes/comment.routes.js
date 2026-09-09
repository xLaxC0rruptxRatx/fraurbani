import { Router } from "express";
import { fieldVal } from '../middlewares/index.js'
import { body, check } from 'express-validator'
import { commentLimiter, validateToUpload } from "../middlewares/index.js";
import { getComments, loadFile, react } from "../controllers/index.js"

const router = Router()

router.post('/', [
  check('comment', 'Pon algo mi pendejo!').notEmpty(),
  //check('rating', 'Ponga algo, pendejo!').notEmpty(),
  commentLimiter,
  fieldVal
  ], loadFile)

router.get('/s', getComments)

//router.patch('/:id/react', react)

export default router