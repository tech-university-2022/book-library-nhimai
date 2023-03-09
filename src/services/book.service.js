const prisma = require('../stores/db.store')

const insertMany = (books) => {
	const promises = books.map(async (book) => {
		return prisma.book.create({
			data: {
				...book
			}
		}).catch(() => console.log(book.id))
	})
	Promise.all(promises)
}

module.exports = {
	BookService: {
		insertMany
	}
}
