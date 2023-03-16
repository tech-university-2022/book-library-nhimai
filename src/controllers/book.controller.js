const { BookHelper } = require('../helpers/book.helper')
const { BookService } = require('../services/book.service')

const getExternalAPI = async (req, res, next) => {
	try {
		const books = await BookHelper.combineBookInfo()
		const result = BookHelper.groupByAuthor(books)
		Object.entries(result).map(([_, value]) => BookHelper.sortByRating(value))
		res.json(result)
	} catch (err) {
		next(err)
	}
}

const saveBooks = async (req, res, next) => {
	try {
		const books = await BookHelper.combineBookInfo()
		// BookService.insertEach(books)
		const existedIds = await BookService.getIds()
		const res = await BookService.insertMany(BookHelper.getNewBooks(books, existedIds))
		res.send(res)
	} catch (err) {
		next(err)
	}
}

const vote = async (req, res, next) => {
	try {
		const { id } = req.params
		const { isLike } = req.query
		await BookService.vote(id, isLike)
		res.send(isLike)
	} catch (err) {
		next(err)
	}
}

const getById = async (req, res, next) => {
	try {
		const { id } = req.params
		const book = await BookService.getDetail(id)
		res.json(book)
	} catch (err) {
		next(err)
	}
}

const getByAuthor = async (req, res, next) => {
	try {
		const { authorName } = req.query
		const books = await BookService.getByAuthor(authorName)
		res.send(books)
	} catch (err) {
		next(err)
	}
}

module.exports = {
	BookController: {
		getExternalAPI,
		saveBooks,
		vote,
		getById,
		getByAuthor,
	},
}
