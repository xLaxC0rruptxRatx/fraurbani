import  Usuario  from '../models/usuario.js'

const activar = async(req, res) => {
  const numero = req.query.phone
  
  
  res.status(500).json({message: 'elpepe'})
}

export {
  activar
}