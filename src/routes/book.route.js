const { Router } = require('express')
const { getExternalAPI} = require('../controllers/book.controller')
const { handleErrors } = require('../middlewares/error_handler.middleware')

const router = Router()
router.get('/', getExternalAPI)
router.post('/')

router.use(handleErrors)

module.exports = { bookRouter: router }