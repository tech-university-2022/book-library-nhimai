const axios = require('axios')
const { BookHelper } = require('../../src/helpers/book.helper')

jest.mock('axios', () => ({
	get: jest.fn((url) => {
		if (url.includes('allBooks')) {
			return {
				data: {
					books: [
						{
							id: 1,
							Author: 'abc',
							Name: 'abc',
						},
						{
							id: 2,
							Author: 'abc',
							Name: 'abc',
						},
					],
				},
			}
		}
		if (url.includes('findBookById')) {
			return {
				data: { rating: 4.9 },
			}
		}
		return {
			data: {},
		}
	}),
}))

describe('callExternalAPI', () => {
	beforeEach(() => {
		axios.get.mockClear()
		// process.env.EXTERNAL_DOMAIN = "external"
	})

	afterEach(() => {
		// delete process.env.EXTERNAL_DOMAIN;
		jest.clearAllMocks()
	})

	it('should call external API', async () => {
		expect(axios.get).toHaveBeenCalledTimes(0)
		const result = await BookHelper.callExternalAPI('allBooks')
		expect(axios.get).toHaveBeenCalledTimes(1)
		expect(result).toEqual({
			books: [
				{
					id: 1,
					Author: 'abc',
					Name: 'abc',
				},
				{
					id: 2,
					Author: 'abc',
					Name: 'abc',
				},
			],
		})
	})
})

describe('combineBookInfo', () => {
	it('should combine book information', async () => {
		expect(axios.get).toHaveBeenCalledTimes(0)
		const result = await BookHelper.combineBookInfo()
		expect(axios.get).toHaveBeenCalledTimes(3)
		expect(result).toEqual([
			{
				id: 1,
				Author: 'abc',
				Name: 'abc',
				Rating: 4.9,
			},
			{
				id: 2,
				Author: 'abc',
				Name: 'abc',
				Rating: 4.9,
			},
		])
	})
})
