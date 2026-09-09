import { accountRoutes, activacionRoutes, adminRoutes, apiRoutes, commentRoutes, downloadRoutes, eventsRoutes, itemsRoutes, messageRoutes, panelRoutes, userRoutes, videosRoutes, webAuthRoutes } from '../routes/index.js'
import express from "express"
import cors from "cors"
import session from "express-session"
import fileUpload from "express-fileupload"
import { dirname, extname, join } from "path"
import cookieParser from 'cookie-parser'
import morgan from "morgan"
import { fileURLToPath } from "url"
import { engine } from 'express-handlebars'
import { dbConnection } from "../database/config.db.js"
import  job  from '../helpers/cron.js'
import { home } from '../controllers/index.js'
import { sender } from '../helpers/index.js'
import { indexLimiter } from '../middlewares/index.js'

class Server {
  constructor() {
    this.app = express()
    this.__dirname = dirname(fileURLToPath(import.meta.url))
    this.job = job
    this.app.set("port", process.env.PORT || 4000)
    this.app.set('views', join(this.__dirname, '../views'))
    this.app.engine('.hbs', engine({
      defaultLayout: 'main',
      layoutsDir: join(this.app.get('views'), 'layouts'),
      partialsDir: join(this.app.get('views'), 'partials'),
      extname: '.hbs',
      helpers: {
        stars: (rating) => {
          rating = Number(rating) || 0
          return '<i class="bi bi-star-fill"></i>'.repeat(rating)
        },
        devBadge: (isDev) => {
          if (!isDev) return ''
          return `<span class="dev-badge">DEV</span>`
        },
        reactionsTotal: (reactions) => {
          if (!reactions) return 0
          return Object.values(reactions).reduce((a, b) => a + b, 0)
        },
        timeAgo: (date) => {
          const seconds = Math.floor((new Date() - new Date(date)) / 1000)

          const intervals = {
            año: 31536000,
            mes: 2592000,
            semana: 604800,
            día: 86400,
            hora: 3600,
            minuto: 60
           }

           for (let key in intervals) {
            const interval = Math.floor(seconds / intervals[key])
             if (interval >= 1) {
               return `Hace ${interval} ${key == 'mes' && interval > 1 ? key+'e' : key}${interval > 1 ? 's' : ''}`
             }
           }

           return 'Hace unos segundos'
        }
      }
  })) 
    this.app.set('view engine', '.hbs')

    this.paths = {
      activacion: '/act',
     // admin: '/admin',
      api: '/api/:param',
      comment: '/comment',
      download: '/download',
      eventos: '/events',
      fbaccount: '/fuckbani/account',
      fbapp: '/fuckbani/app',
      items: '/items',
      message: '/message',
      panel: '/panel',
      videos: '/videos',
      webauth: '/auth',
    }

    this.dbCnn()
    this.midlewares()
    this.routes()
    this.job.start()
  }

  async dbCnn() {
    await dbConnection()
  }

  midlewares() {
    this.app.use(cors())
    this.app.use(express.static(join(this.__dirname, "/../public")))
    this.app.use(morgan("dev"))
    this.app.use(express.urlencoded({ extended: false }))
    this.app.use(express.json())
    this.app.set('trust proxy', 1)
    this.app.use(cookieParser())
    this.app.use(fileUpload({
  useTempFiles: true,
  tempFileDir: join(this.__dirname, '../uploads/tmp'),
  createParentPath: true
}))
  }

  routes() {
    this.app.use(this.paths.fbapp, accountRoutes),
    this.app.use(this.paths.fbapp, userRoutes),
    this.app.use(this.paths.fbaccount, accountRoutes),
    this.app.use(this.paths.activacion, activacionRoutes),
    this.app.use(this.paths.admin, adminRoutes),
    this.app.use(this.paths.api, apiRoutes),
    this.app.use(this.paths.comment, commentRoutes),
    this.app.use(this.paths.download, downloadRoutes),
    this.app.use(this.paths.eventos, eventsRoutes),
    this.app.use(this.paths.items, itemsRoutes),
    this.app.use(this.paths.message, messageRoutes),
    this.app.use(this.paths.panel, panelRoutes),
    this.app.use(this.paths.videos, videosRoutes),
    this.app.use(this.paths.webauth, webAuthRoutes),
    this.app.get('/', indexLimiter, home)
    this.app.get('{*any}', (req, res) => {
      res.status(404).send("<h1>404 - No encontrado w :c</h1>")
    })
  }

  listen() {
    this.app.listen(this.app.get("port"), '0.0.0.0', () => {
      console.log("Server activo... | PUERTO:", this.app.get("port"))
    })
  }
}

export default Server