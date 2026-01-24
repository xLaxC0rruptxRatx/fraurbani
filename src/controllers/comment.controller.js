import Comment from '../models/comment.js'
import { dirname, join } from "path";
import { fileURLToPath } from "url";
import fs from 'fs/promises'

import cloudinary from 'cloudinary'

import { fileUpload } from "../helpers/index.js";

const __dirname = dirname(fileURLToPath(import.meta.url))

const cloudinaryv2 = cloudinary.v2
cloudinaryv2.config( process.env.CLOUDINARY_URL )


const loadFile = async (req, res) => {
  try {
    let photo = "/./img/avatar.png";

    if (req.files && req.files.file) {
      const { tempFilePath } = req.files.file;

      const result = await cloudinaryv2.uploader.upload(tempFilePath);
      photo = result.secure_url;

      // 🔥 BORRAR ARCHIVO TEMPORAL
      await fs.unlink(tempFilePath);
    }

    if (!req.body.comment || !req.body.rating) {
      return res.status(400).json({ msg: 'Datos incompletos' });
    }

    await Comment.create({
      name: req.body.name || 'Anonimo',
      rating: Number(req.body.rating),
      comment: req.body.comment,
      photo
    });

    res.redirect('/#newComment');
  } catch (error) {
    console.error(error);
    res.status(400).json({ error });
  }
};
/*
const updateImage = async(req, res) => {
  const { collection, id } = req.params

  let model;

  switch ( collection ) {
    case 'usuarios':
      model = await Usuario.findById(id)
      if ( !model ) {
        return res.status(400).json({
          msg: `No existe un usuario con id: ${ id }`
        })
      }
      
      break;

      case 'productos':
        model = await Product.findById(id)
        if ( !model ) {
          return res.status(400).json({
            msg: `No existe un producto con id: ${ id }`
          })
        }
        
        break;
  
    default:
      res.status(500).json({ msg: 'No validado!' })
  }

  //Eliminar imágenes previas
  if ( model.img ) {
    const imgPath = join( __dirname, '../uploads', collection, model.img )
    if ( fs.existsSync( imgPath ) ) {
      fs.unlinkSync( imgPath )
    }
  }

  const nombre = await fileUpload(req.files, undefined, collection );
  model.img = nombre

  await model.save()

  res.json({ model })
}

const updateImageCloudinary = async(req, res) => {
  const { collection, id } = req.params

  let model;

  switch ( collection ) {
    case 'usuarios':
      model = await Usuario.findById(id)
      if ( !model ) {
        return res.status(400).json({
          msg: `No existe un usuario con id: ${ id }`
        })
      }
      
      break;

      case 'productos':
        model = await Product.findById(id)
        if ( !model ) {
          return res.status(400).json({
            msg: `No existe un producto con id: ${ id }`
          })
        }
        
        break;
  
    default:
      res.status(500).json({ msg: 'No validado!' })
  }

  //Eliminar imágenes previas
  if ( model.img ) {
    const nombreArr = model.img.split('/')
  }

  const { tempFilePath } = req.files.file
  const { secure_url } = await cloudinaryv2.uploader.upload( tempFilePath )

  model.img = secure_url
  await model.save()

  res.json({ model })

}

const showImage = async(req, res) => {
  const { collection, id } = req.params

  let model;

  switch ( collection ) {
    case 'usuarios':
      model = await Usuario.findById(id)
      if ( !model ) {
        return res.status(400).json({
          msg: `No existe un usuario con id: ${ id }`
        })
      }
      
      break;

      case 'productos':
        model = await Product.findById(id)
        if ( !model ) {
          return res.status(400).json({
            msg: `No existe un producto con id: ${ id }`
          })
        }
        
        break;
  
    default:
      res.status(500).json({ msg: 'No validado!' })
  }

  //Eliminar imágenes previas
  if ( model.img ) {
    const imgPath = join( __dirname, '../uploads', collection, model.img )
    if ( fs.existsSync( imgPath ) ) {
      return res.sendFile( imgPath )
    }
  }

  res.sendFile( join( __dirname, '../assets/noImage.jpg' ) )
}
*/
export {
  loadFile,
  /*updateImage,
  updateImageCloudinary,
  showImage*/
}

