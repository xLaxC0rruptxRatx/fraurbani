import { Router } from 'express'
import { getUsers } from '../controllers/index.js'
import { admRole, collectionVal, hvaRole, jwtVal } from '../middlewares/index.js'

const router = Router()

/*router.get('/users/:collection', [
 // jwtVal,
  //hvaRole,
//  admRole,
  collectionVal,
  ], getUsers)
*/
export default router