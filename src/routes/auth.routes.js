const { login, register } = require("../controllers/auth")
const {
	emptyEmailField,
	emptyPasswordField,
	emailConflict,
	passwordMatch,
	emptyFirstName,
	emptyLastName,
	emptyUsername,
	accountEmailExist,
} = require("../middleware/model")

const router = require("express").Router()

// Login route
router.route("/login").post(emptyEmailField, emptyPasswordField, accountEmailExist,login)
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
		passwordMatch,
		register,
	)

module.exports = router
