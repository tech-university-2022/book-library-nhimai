const Joi = require('joi')

const Vote = {
	query: Joi.object(
		{
			isLike: Joi.boolean().required(),
		},
	),
	params: Joi.object(
		{
			id: Joi.number().integer().required(),
		},
	),
}

const GetById = {
	params: Joi.object(
		{
			id: Joi.number().integer().required(),
		},
	),
}

const GetByAuthor = {
	query: Joi.object(
		{
			authorName: Joi.string().required(),
		},
	),
}

module.exports = {
	BookSchemas: {
		Vote,
		GetById,
		GetByAuthor,
	},
}
