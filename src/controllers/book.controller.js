const { callExternalAPI, groupByAuthor } = require('../helpers/book.helper')
const { ALL_BOOKS, FIND_BOOK_BY_ID } = require('../constants/endpoint.constant')

const getExternalAPI = async (req, res, next) => {
	try {
		const books = await callExternalAPI(ALL_BOOKS).then(res => res.books)
		const ratings = books.map(async(book) => {
			const rating = await callExternalAPI(`${FIND_BOOK_BY_ID}/${book.id}`)
			return {
				...book,
				rating: rating.rating
			}
		})
		const ratedBooks = await Promise.all(ratings)
		const result = groupByAuthor(ratedBooks)
		res.json(result)
	} catch (err) {
		next(err)
	}
}

module.exports = { getExternalAPI }