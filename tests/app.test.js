const request = require('supertest')
const { BookService } = require('../src/services/book.service')

const { app, server } = require('../src/app')

jest.mock('../src/services/book.service', () => ({
	BookService: {
		getDetail: jest.fn(),
	},
}))

describe('App', () => {
	describe('GET /books/:id', () => {
		it('should respond with a 200 status code and return book', async () => {
		// 	const book = {
		// 		Id: 1,
		// 		Name: 'name',
		// 		Author: 'author',
		// 		Is_Like: true,
		// 	}
		// 	BookService.getDetail.mockResolvedValueOnce(book)
		// 	const response = await request(app).get('/books/1')
		// 	expect(response.statusCode).toEqual(200)
		// 	expect(response.body).toEqual(book)
		// })

			// it('should respond with a 400 status code and error message when request body is not valid', async () => {
			// 	const response = await request(app).get('/books/abc')
			// 	expect(response.statusCode).toEqual(400)
			// 	expect(response.body).toEqual({ message: '"id" must be a number' })
			// })

		// it('should respond with a 500 status code and error message when unexpected error happens', async () => {
		// 	BookService.getDetail.mockRejectedValueOnce(new Error('ERROR!'))
		// 	const response = await request(app).get('/books/1')
		// 	expect(response.statusCode).toEqual(500)
		// 	expect(response.body).toEqual({ message: 'Something unexpected happened' })
		})
	})

	afterAll(() => {ß
		server.close()
	})
})