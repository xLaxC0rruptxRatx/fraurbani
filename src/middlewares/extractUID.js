const extractUid = (req, res, next) => {
  try {
    const last = req.body?.transactions?.slice(-1)[0]
    if (!last?.access?.uid) {
      return res.status(400).json({ error: 'UID no encontrado' })
    }

    req.uid = String(last.access.uid)
    console.log(`el puto req.uid --> ${req.uid}`)
    next()
  } catch (err) {
    res.status(400).json({ error: 'Error leyendo UID' })
  }
}

export default extractUid