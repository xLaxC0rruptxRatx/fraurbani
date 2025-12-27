import cron from 'cron'
import https from 'https'

const url = 'https://cyberpsychosis.onrender.com'
const job = new cron.CronJob('*/14 * * * *', function() {
  console.log('Reiniciando...')
  https
  .get( url, (res) => {
    if ( res.statusCode === 200 ) {
      console.log('Restarted.')
    } else {
      console.error(`Restart Failed :c ${ res.statusCode }`)
    }
  })
  .on('error', (err) => {
    console.error('Error durante el reinicio', err.message)
  })
})

export default job