const prisma = require('../stores/db.store')

const insertMany = async (books) => {
	const promises = books.map(async (book) => {
		return prisma.book.create({
			data: {
				...book
			}
		})
	})
	Promise.all(promises)
}

module.exports = {
	BookService: {
		insertMany
	}
}
