import requests from '../helpers/requests.helper.js'


const sendAccess = async(req, res) => {
  const body = req.body
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
  console.log('ap')
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
  const user_id = req.body.user_id
  const cantidad = req.body.amount / 100
  
  if (cantidad > 50) return res.status(500).json({message: 'Maximo 50!! >:c'})
  
   req.body = { user_id: user_id , add_urbicoins: cantidad }
  
  
  const cantidadi = 20;

for (let i = 0; i < cantidadi; i++) {
  
  try {
    const resp = await requests(
      req,
      `https://app.urbani.io/app/p/addPoints`,
      'POST',
      req.body
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

export {
  addPoints,
  sendAccess,
  sendUrbiCoins
}