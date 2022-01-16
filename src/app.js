const express = require("express")
const setup = require("./setup")
const { PORT } = require("./config")

const app = express()
setup(app)

app.listen(PORT, () => {
	const serverMsg = `Server running on http://localhost:${PORT}`
	console.log(serverMsg)
})
