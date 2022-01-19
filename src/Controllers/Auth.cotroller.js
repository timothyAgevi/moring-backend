const { login, register } = require("../Services/Auth.service")
const {
	passwordRegex,
	emptyEmailField,
	emptyPasswordField,
	passwordMatch,
	emptyFirstName,
	emptyLastName,
	emptyUsername,
} = require("../Middlewares/Form.middleware")
const { emailConflict, accountEmailExist } = require("../Middlewares/Model.middleware")

const router = require("express").Router()

// Login route
router
	.route("/login")
	.post(emptyEmailField, emptyPasswordField, accountEmailExist, login)
// Register route
router
	.route("/register")
	.post(
		emptyEmailField,
		emailConflict,
		emptyFirstName,
		emptyLastName,
		emptyUsername,
		emptyPasswordField,
		passwordRegex,
		passwordMatch,
		register,
	)

module.exports = router
