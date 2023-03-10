function generateValidationMiddleware (properties) {
	return async function validationMiddleware (req, res, next) {
		try {
			for (let property in properties) {
				const schema = properties[property]
				const value = await schema.validateAsync(req[property])
				req[property] = value
			}
			next()
		} catch (err) {
			next(err)
		}
	}
}

module.exports = {
	generateValidationMiddleware
}
