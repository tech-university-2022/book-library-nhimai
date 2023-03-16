const { Router } = require('express')
const { BookController } = require('../controllers/book.controller')
const { handleErrors } = require('../middlewares/error_handler.middleware')
const { BookSchemas } = require('../schemas/book.schema')
const { generateValidationMiddleware } = require('../middlewares/validation.middleware')

const router = Router()
router.get('/', BookController.getExternalAPI)
router.get('/all', BookController.getAll)
router.post('/', BookController.saveBooks)
router.patch('/:id', generateValidationMiddleware(BookSchemas.Vote), BookController.vote)
router.get('/author', generateValidationMiddleware(BookSchemas.GetByAuthor), BookController.getByAuthor)
router.get('/:id', generateValidationMiddleware(BookSchemas.GetById), BookController.getById)

router.use(handleErrors)

module.exports = { BookRouter: router }
