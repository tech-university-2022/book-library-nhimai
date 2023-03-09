const { Router } = require('express')

const { BookRouter } = require('./book.route')

const router = Router()

router.use('/books', BookRouter)

module.exports = router
