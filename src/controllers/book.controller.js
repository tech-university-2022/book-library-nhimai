const { combineBookInfo, groupByAuthor } = require('../helpers/book.helper')
const { BookService } = require('../services/book.service')

const getExternalAPI = async (req, res, next) => {
	try {
		const books = await combineBookInfo()
		const result = groupByAuthor(books)
		res.json(result)
	} catch (err) {
		next(err)
	}
}

const saveBooks = async (req, res, next) => {
	try {
		const books = await combineBookInfo()
		await BookService.insertMany(books)
		res.send(true)
	} catch (err) {
		next(err)
	}
}

module.exports = {
	BookController: {
		getExternalAPI,
		saveBooks
	}
}
