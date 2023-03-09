const { Router } = require('express')

const { bookRouter } = require('./book.route')

const router = Router()

router.use('/books', bookRouter)

module.exports = router