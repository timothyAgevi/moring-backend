// eslint-disable-next-line no-unused-vars
const { Application } = require("express")
const UserController = require("../Controllers/User.controller")
const AuthController = require("../Controllers/Auth.cotroller")
const BlogController = require("../Controllers/Blog.controller")
const html = require("../utils/html")
const ErrorHandler = require("../ErrorHandler/ErrorHandler")

/**
 *
 * @param {{app:Application}} param0
 */
module.exports = ({ app }) => {
	app.use("/auth", AuthController)
	app.use("/user", UserController)
	app.use("/blog", BlogController)
	app.get("/", (req, res) => {
		res.send(html)
	})
	app.use(ErrorHandler)
}
