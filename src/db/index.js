const { connect } = require("mongoose")

module.exports = async ({ databaseUrl }) => {
	connect(databaseUrl)
		.then(() => {
			console.log("Database connected")
		})
		.catch((err) => {
			console.log(err.message)
		})
}
