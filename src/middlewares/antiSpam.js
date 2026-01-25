import rateLimit from 'express-rate-limit'

const commentLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 2,
  message: 'Skc alv! .l.'
})

export default commentLimiter
