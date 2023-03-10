const prisma = require('../stores/db.store')

const insertEach = (books) => {
	const promises = books.map(async (book) => {
		return prisma.book.create({
			data: {
				...book
			}
		}).catch(() => console.log(book.id))
	})
	Promise.all(promises)
}

const insertMany = async (books) => {
	const res = await prisma.book.createMany({
		data: books
	})
	return res
}

const getIds = async () => {
	const Ids = await prisma.book.findMany({
		select: {
			id: true
		}
	})
	return Ids.map(book => book.id)
}

const vote = async (id, isLike) => {
	await prisma.book.update({
		where: {
			id: id
		},
		data: {
			Is_like: isLike
		}
	})
}

const getDetail = async (id) => {
	const book = await prisma.book.findFirstOrThrow({
		select: {
			id: true,
			Author: true,
			Name: true,
			Is_like: true,
			Rating: false
		},
		where: {
			id
		}
	})
	return book
}

const getByAuthor = async (authorName) => {
	const books = await prisma.book.findMany({
		where: {
			Author: {
				equals: authorName
			}
		}
	})
	return books
}

module.exports = {
	BookService: {
		insertEach,
		insertMany,
		vote,
		getIds,
		getDetail,
		getByAuthor
	}
}
