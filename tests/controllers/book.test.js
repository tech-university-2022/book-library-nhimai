const { BookService } = require('../../src/services/book.service');
const { BookController } = require('../../src/controllers/book.controller')

jest.mock('../../src/services/book.service', () => ({
  BookService: {
    getDetail: jest.fn(),
  },
}));

describe('GET /books/:id', () => {
    const mockJson = jest.fn();
    const mockNext = jest.fn();
    beforeEach(() => {
        BookService.getDetail.mockClear();
        mockJson.mockClear();
        mockNext.mockClear();
    });

    it('should get book by id & do not return Rating', async () => {
        BookService.getDetail.mockResolvedValue({
            Id: 1,
            Name: "name",
            Author: "author",
            Is_Like: true
        });
        expect(BookService.getDetail).toHaveBeenCalledTimes(0);
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
        expect(BookService.getDetail).toHaveBeenCalledTimes(1);
        expect(mockJson).toHaveBeenCalledWith({
            Id: 1,
            Name: "name",
            Author: "author",
            Is_Like: true
        });
    });
});