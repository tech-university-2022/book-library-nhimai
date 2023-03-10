const axios = require('axios')
const { ALL_BOOKS, FIND_BOOK_BY_ID } = require('../constants/endpoint.constant')

const callExternalAPI = async (endpoint) => {
	const url = `${process.env.EXTERNAL_DOMAIN}/${endpoint}`
	const response = await axios.get(url)
	return response.data
}

const combineBookInfo = async () => {
	const books = await callExternalAPI(ALL_BOOKS).then(res => res.books)
	console.log(books)
	const ratings = books.map(async (book) => {
		const rating = await callExternalAPI(`${FIND_BOOK_BY_ID}/${book.id}`)
		return {
			...book,
			Rating: rating.rating
		}
	})
	const ratedBooks = await Promise.all(ratings)
	return ratedBooks
}

const groupByAuthor = (ratedBooks) => ratedBooks.reduce((accumulator, currentValue) => {
	const obj = { ...accumulator }
	const author = currentValue.Author
	obj[author] = [...obj[author] || [], currentValue]
	return obj
}, {})

const getNewBooks = (books, existedIds) => {
	const newBooks = books.filter(book => !existedIds.includes(book.id))
	return newBooks
}

const sortByRating = (books) => {
	return books.sort((a, b) => a.Rating - b.Rating)
}

module.exports = {
	BookHelper: {
		callExternalAPI,
		combineBookInfo,
		groupByAuthor,
		getNewBooks,
		sortByRating
	}
}
