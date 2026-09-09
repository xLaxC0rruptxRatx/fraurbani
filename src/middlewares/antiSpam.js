import rateLimit from 'express-rate-limit'

const commentLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 2,
  message: JSON.stringify({message: 'Skc alv! .l.'}, null, 2)
})

const userV2Limiter = rateLimit({
  windowMs: 10 * 1000,
  max: 3,
  message: JSON.stringify({message: 'Skc alv! .l.'}, null, 2)
})

const loginLimiter = rateLimit({
  windowMs: 15 * 1000,
  max: 2,
  message: JSON.stringify({message: 'Skc alv! .l.'}, null, 2)
})

const indexLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 6,
  message: JSON.stringify({message: 'Skc alv! .l.'}, null, 2)
})

const itemsLimiter = rateLimit({
  windowMs: 20 * 1000,
  max: 5,
  message: JSON.stringify({message: 'Skc alv! .l.'}, null, 2)
})

export { commentLimiter, indexLimiter, itemsLimiter, loginLimiter, userV2Limiter }
