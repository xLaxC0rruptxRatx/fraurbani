import { Router } from "express";
import { check } from "express-validator";

import { commentLimiter, validateToUpload } from "../middlewares/index.js";
import { loadFile } from "../controllers/index.js";

const router = Router()

router.post('/', commentLimiter, loadFile)
/*
router.get('/', (req, res) => {
  res.send(`
  <form method="POST" action="/comment" enctype="multipart/form-data">
   <input type="text" name="name">
   <input type="number" name="rating">
   <input type="text" name="comment">
   <input type="file" name="file" enctype="multipart/form-data">
   <input type="submit" value="SUBIR">
  </form>
  `)
})
*/
/*router.put('/:collection/:id', [
    validateToUpload,
    check('id','Debe de ser un mongo id').isMongoId(),
    check('collection').custom( c => allowedCollections( c, ['usuarios', 'productos'] ) ),
    fieldVal
], updateImageCloudinary)
// ], updateImage)

router.get('/:collection/:id', [
    check('id','Debe de ser un mongo id').isMongoId(),
    check('collection').custom( c => allowedCollections( c, ['usuarios', 'productos'] ) ),
    fieldVal
], showImage)
*/
export default router