const { Router } = require('express')
const { BookController } = require('../controllers/book.controller')
const { handleErrors } = require('../middlewares/error_handler.middleware')

const router = Router()
router.get('/', BookController.getExternalAPI)
router.post('/', BookController.saveBooks)

router.use(handleErrors)

module.exports = { BookRouter: router }
