import { IP } from '../models/index.js'
import { decrypt, encrypt, parseJwt, sender } from '../helpers/index.js'

const renderAct = async(req, res) => {
  
  if(!req.query.user) {
    return res.render('activador.hbs', { adv: 'Error, petición sin token!', advIcon: 'warningRedIcon', Avalue: 'Inicio', href: '/' })
  }
  
  console.log(JSON.stringify(req.params))
  
  const raw = req.headers['x-forwarded-for'] 
    || req.connection.remoteAddress 
    || ''
  const ip = raw.split(',')[0].trim()
  
  console.log(ip)
  
  const encIp = encrypt(ip)
  
  const auth = req.query.user
  
  let data
try {
  data = parseJwt(auth)
  if (!data?.main_phone) throw new Error()
} catch {
  return res.status(400).render('activador.hbs', { adv: 'Token inválido', advIcon: 'warningRedIcon', Avalue: 'Inicio', href: '/'})
}
  
  const phone = data.main_phone

  const [ encIpExs, authExs, phoneExs ] = await Promise.all([
    IP.findOne({ encIp }),
    IP.findOne({ auth }),
    IP.findOne({ phone })
  ])
  
  
  if( authExs ) {
    if(authExs.auth == auth) {
    return res.status(403).render('activador.hbs',{adv: `Usuario ya fué activado.`, advIcon: 'warningIcon', Avalue: 'Página principal', href: '/'})
  }
  }
  
  if(!encIpExs) {
    sender(`Intento sin descargar de web --> ${ auth }
    📱: ${ phone }
    From: ${ ip }`)
    return res.status(403).render('activador.hbs', { adv: `Descarga el APK desde la página principal, recuerda que si alguien te vendió o intentó vender ésta apk fuiste estafado.`, advIcon: 'warningRedIcon', Avalue: 'Página principal', href: '/'})
  }
  
  if(phoneExs) {
    phoneExs.auth = req.query.user
    await Promise.all([
      IP.deleteOne({ encIp }),
      phoneExs.save(),
    ])
    sender(`Usuario reactivado
🔑: ${req.query.user}
📱: ${phone}
From: ${ ip }`)
  } else {
    encIpExs.encIp = null
    encIpExs.auth = req.query.user
    encIpExs.phone = phone
    encIpExs.activated = true
    await encIpExs.save()
    sender(`Nuevo usuario activado
🔑: ${req.query.user}
📱: ${phone}
From: ${ ip }`)
  }
  
  res.render('activador.hbs', { adv: `Activado, esta APK es Gratuita si te la están vendiendo o intentando vender estás siendo estafado.`, advIcon: 'icon_profile_modal_confirm_code', Avalue: 'Página principal', href: '/'})
}

export {
  renderAct
}