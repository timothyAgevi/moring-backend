/* eslint-disable no-unused-vars */
const { createServer } = require("http")
const { Application } = require("express")
const { PORT } = require("./config")

/**
 *Pass app (express instance) to be served by the default http sever
 * @param {{app:Application}} param0
 */
module.exports = async ({ app }) => {
	const server = createServer(app)
	server.listen(PORT, () => {
		const serverMsg = `Server running on http://localhost:${PORT}`
		console.log(serverMsg)
	})
}
