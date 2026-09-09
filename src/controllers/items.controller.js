import { IP } from '../models/index.js'
import { decrypt, encrypt, sender, parseJwt } from '../helpers/index.js'

const renderBal = async(req, res) => {
  const auth = req.query.user
  
  try {
  
  if(!auth) {
    return res.render('items.hbs', { adv: 'Error, petición sin Usuario!', advIcon: 'warningRedIcon', Avalue: 'Inicio', href: '/' })
  }
  console.log(auth)

  const encrypted = auth.replace(/ /g, '+');
  //const phone = decrypt(encrypted)
  
  let phone
  try {
    phone = decrypt(encrypted)
    if (phone.length != 10) throw new Error()
  } catch {
    return res.status(400).render('items.hbs',{adv: `Error en usuario.`, advIcon: 'warningRedIcon', Avalue: 'Inicio', href: '/'})
  }
    
  if(!phone) {
    return res.status(400).render('items.hbs',{adv: `Error en usuario.`, advIcon: 'warningIcon', Avalue: 'Inicio', href: '/'})
  }
  
  const authExs = await IP.findOne({ phone })
    
  if( !authExs ) {
     return res.status(400).render('items.hbs',{adv: `Usuario invalido.`, advIcon: 'warningIcon', Avalue: 'Inicio', href: '/'})
  }
  
  res.render('items.hbs', {
    form: true, 
    balance: authExs.balance ? authExs.balance / 100 : 300, 
    freeTrip: authExs.points ? authExs.points : 0, 
    auth, 
    isAutoReg: authExs.Settings.autoRegen ? 'checked' : null, 
    isRanUsr: authExs.Settings.ranUsr ? 'checked' : null, 
    hombre: authExs.Settings.male ? 'checked' : null, 
    mujer: authExs.Settings.female ? 'checked' : null 
  })

} catch(err) {
  res.json({ message: err })
}
}


const updateItems = async (req, res) => {
  try {
  const raw = req.headers['x-forwarded-for'] 
    || req.connection.remoteAddress 
    || ''
  const ip = raw.split(',')[0].trim()

    const auth = req.query.user

    const { balance, freeTrip, atRg, raUs, ho, mu } = req.body
    
    if (!auth) {
      return res.json({message: 'Falta usuario!'})
    }

    const encrypted = auth.replace(/ /g, '+')
  
    let phone
  try {
    phone = decrypt(encrypted)
    if (phone.length != 10) throw new Error()
  } catch {
    return res.status(400).json({message: 'Error en Usuario!'})
  }
    
    if (balance > 9999) {
      return res.status(400).json({message: 'Error!'})
    }

    await IP.updateOne(
      { phone },
      {
        balance: balance * 100,
        points: freeTrip || 0,
        Settings: {
          autoRegen: atRg ? true : false,
          ranUsr: raUs ? true : false,
          male: ho ? true : false,
          female: mu ? true : false,
        }
      }
    )
    
    sender(`${phone} cambió sus items a $ ${balance} y 🎫 ${freeTrip}
From: ${ip}`)

    res.redirect(`/items?user=${auth}`)

  } catch (err) {
    res.status(500).json({ message: 'Error del servidor', error: err.message })
  }
}


export {
  renderBal,
  updateItems
}