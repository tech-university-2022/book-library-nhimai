const { BookService } = require('../../src/services/book.service')
const { BookController } = require('../../src/controllers/book.controller')
const { BookHelper } = require('../../src/helpers/book.helper')

jest.mock('../../src/services/book.service', () => ({
	BookService: {
		getDetail: jest.fn(),
	},
}))

jest.mock('../../src/helpers/book.helper', () => {
	const { BookHelper } = jest.requireActual('../../src/helpers/book.helper')

	return {
		BookHelper: {
			...BookHelper,
			combineBookInfo: jest.fn(),
		},
	}
})

describe('getById', () => {
	const mockJson = jest.fn()
	const mockNext = jest.fn()

	beforeEach(() => {
		BookService.getDetail.mockClear()
		mockJson.mockClear()
		mockNext.mockClear()
	})

	afterEach(() => {
		jest.clearAllMocks()
	})

	it('should get book by id & do not return Rating', async () => {
		BookService.getDetail.mockResolvedValue({
			Id: 1,
			Name: 'name',
			Author: 'author',
			Is_Like: true,
		})
		expect(BookService.getDetail).toHaveBeenCalledTimes(0)
		await BookController.getById(
			{
				params:
                {
                	id: 1,
                },
			},
			{
				json: mockJson,
			},
			mockNext,
		)
		expect(BookService.getDetail).toHaveBeenCalledTimes(1)
		expect(mockJson).toHaveBeenCalledWith({
			Id: 1,
			Name: 'name',
			Author: 'author',
			Is_Like: true,
		})
	})

	it('should return error', async () => {
		const mockError = new Error('ERROR!')
		BookService.getDetail.mockRejectedValue(mockError)

		expect(mockJson).not.toHaveBeenCalled()
		expect(BookService.getDetail).toHaveBeenCalledTimes(0)
		await BookController.getById(
			{
				params:
                {
                	id: 0,
                },
			},
			{
				json: mockJson,
			},
			mockNext,
		)
		expect(BookService.getDetail).toHaveBeenCalledTimes(1)
		expect(mockJson).not.toHaveBeenCalled()
		expect(mockNext).toHaveBeenCalledWith(mockError)
	})
})

describe('getExternalAPI', () => {
	const mockJson = jest.fn()
	const mockNext = jest.fn()

	beforeEach(() => {
		BookHelper.combineBookInfo.mockClear()
		mockJson.mockClear()
		mockNext.mockClear()
	})

	afterEach(() => {
		jest.clearAllMocks()
	})

	it('get books group by author', async () => {
		const data = [
			{
				id: 1,
				Author: 'author 1',
				Name: 'name',
				Rating: 4.2,
			},
			{
				id: 2,
				Author: 'author 1',
				Name: 'name',
				Rating: 4.1,
			},
			{
				id: 3,
				Author: 'author 2',
				Name: 'name',
				Rating: 3.5,
			},
		]
		BookHelper.combineBookInfo.mockResolvedValue(data)
		expect(BookHelper.combineBookInfo).toHaveBeenCalledTimes(0)
		await BookController.getExternalAPI(
			{
			},
			{
				json: mockJson,
			},
			mockNext,
		)
		expect(BookHelper.combineBookInfo).toHaveBeenCalledTimes(1)
		expect(mockJson).toHaveBeenCalledWith({
			'author 1': [
				{
					id: 2,
					Author: 'author 1',
					Name: 'name',
					Rating: 4.1,
				},
				{
					id: 1,
					Author: 'author 1',
					Name: 'name',
					Rating: 4.2,
				},
			],
			'author 2': [
				{
					id: 3,
					Author: 'author 2',
					Name: 'name',
					Rating: 3.5,
				},
			],
		})
	})
})
