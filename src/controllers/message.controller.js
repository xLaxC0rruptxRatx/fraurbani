import { sender } from '../helpers/index.js'

const sendMessage = (req, res) => {
  let msg
 
  if(req.query.ip) {
  msg = `■■■■■🌐🌟👤■■■■■
🌐 IP: ${req.query.ip}
🗺 País: ${req.query.country_name}
🌃 Ciudad: ${req.query.city}
🔌Int. Comp: ${req.query.org}
🔗URL : ${req.query.at}
■■■■■■■■■■■■■■■`
  } else {
    const { mensaje, nombre } = req.body
    const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress

    if(mensaje) msg = `NUEVO MENSAJE 📨
👤 De: ${ nombre || 'Anonimo' } 
🗣 Dice: ${ mensaje }
🌐 IP: ${ ip }`
  }
  
  sender(msg || 'Sin mensaje', res)
  
  res.redirect('/')
  
}

export default sendMessage