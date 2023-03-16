const express = require('express')
var cors = require('cors')
const router = require('./routes/index')

const app = express()
const PORT = 4000

const corsOptions = {
	origin:'http://localhost:3000', 
	credentials:true,           
	optionSuccessStatus:200
}
app.use(cors(corsOptions))

app.use('/', router)
app.use(express.json())

const server = app.listen(PORT, (error) => {
	if (!error) {
		console.log(`App is listening on port ${PORT}`)
	} else {
		console.log('Error occurred, server can\'t start', error)
	}
})

module.exports = { app, server }
