import TelegramBot from 'node-telegram-bot-api'

// Creamos una instancia del bot en modo "polling" (escucha activa)
const bot = new TelegramBot(process.env.telegram_bot_id, { polling: false });

const sender = async (msg, res) => {
  try {
    const sentMessage = await bot.sendMessage(process.env.chat_id, msg);
    //console.log('Mensaje enviado:', sentMessage.text);
    res.status(201)
  } catch (err) {
    console.error('Error al enviar mensaje:', err.message);
  }
};

export default sender