const { connect } = require("mongoose")

/**
 *
 * @param {{databaseUrl:string}} param0
 */
module.exports = async ({ databaseUrl }) => {
	connect(databaseUrl)
		.then(() => {
			console.log("Database connected")
		})
		.catch((err) => {
			console.log(err.message)
		})
}
