const prisma = require('../../src/stores/db.store')
const { BookService } = require('../../src/services/book.service')

jest.mock('../../src/stores/db.store', () => ({
	book: {
		findMany: jest.fn(),
	},
}))

describe('get Ids of book', () => {
	it('should get all Ids of books', async () => {
		prisma.book.findMany.mockResolvedValue([
			{ id: 1 },
			{ id: 2 },
			{ id: 3 },
		])
		expect(prisma.book.findMany).toHaveBeenCalledTimes(0)
		const result = await BookService.getIds()
		expect(prisma.book.findMany).toHaveBeenCalledTimes(1)
		expect(result).toEqual([1, 2, 3])
	})
})
