const axios = require('axios')

const callExternalAPI = async (endpoint) => {
	const url = `${process.env.EXTERNAL_DOMAIN}/${endpoint}`
	const response = await axios.get(url)
	return response.data
}

const groupByAuthor = (ratedBooks) => ratedBooks.reduce((accumulator, currentValue) => {
	const obj = {...accumulator}
	const author = currentValue.Author
	obj[author] = [...obj[author] || [], currentValue] 
	console.log(obj[author])
	return obj
}, {})

module.exports = { callExternalAPI, groupByAuthor }